"""Генерирует PDF квитанцию для оплаты обучения в АНО ДПО УЦГТН"""
import base64
import io
import json
import urllib.request


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    from reportlab.lib.pagesizes import A5, landscape
    from reportlab.lib import colors
    from reportlab.lib.units import mm
    from reportlab.pdfgen import canvas
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from PIL import Image as PILImage

    # Скачиваем QR-код
    qr_url = "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/bucket/72c27b20-f126-4633-ac5e-1872acb88dc6.png"
    with urllib.request.urlopen(qr_url) as resp:
        qr_data = resp.read()

    qr_img = PILImage.open(io.BytesIO(qr_data)).convert("RGB")
    qr_buf = io.BytesIO()
    qr_img.save(qr_buf, format="PNG")
    qr_buf.seek(0)

    buf = io.BytesIO()
    w, h = landscape(A5)
    c = canvas.Canvas(buf, pagesize=(w, h))

    # Фон
    c.setFillColorRGB(1, 1, 1)
    c.rect(0, 0, w, h, fill=1, stroke=0)

    # Разделитель по центру
    mid = w / 2
    c.setStrokeColorRGB(0.7, 0.7, 0.7)
    c.setDash(4, 4)
    c.line(mid, 5 * mm, mid, h - 5 * mm)
    c.setDash()

    # --- Левая часть: реквизиты ---
    left = 8 * mm
    right_left = mid - 8 * mm

    def txt(text, x, y, size=8, bold=False, color=(0, 0, 0)):
        c.setFillColorRGB(*color)
        c.setFont("Helvetica-Bold" if bold else "Helvetica", size)
        c.drawString(x, y, text)

    def line_under(x1, x2, y):
        c.setStrokeColorRGB(0, 0, 0)
        c.setDash()
        c.line(x1, y, x2, y)

    y = h - 12 * mm

    # Получатель
    txt("АНО ДПО «Учебный центр ГорГазНефть»", left, y, size=9, bold=True)
    line_under(left, right_left, y - 1 * mm)
    y -= 5 * mm
    txt("(наименование получателя платежа)", left + 10 * mm, y, size=6, color=(0.4, 0.4, 0.4))
    y -= 7 * mm

    # ИНН и счёт
    txt("ИНН  0268104892", left, y, size=8, bold=True)
    txt("№  40703810880690000003", left + 35 * mm, y, size=8, bold=True)
    line_under(left + 32 * mm, right_left, y - 1 * mm)
    y -= 5 * mm
    txt("(ИНН получателя платежа)", left, y, size=6, color=(0.4, 0.4, 0.4))
    txt("(номер счёта получателя платежа)", left + 40 * mm, y, size=6, color=(0.4, 0.4, 0.4))
    y -= 7 * mm

    # Банк
    txt("АО \"АЛЬФА-БАНК\"  КПП 026801001", left, y, size=9, bold=True)
    line_under(left, right_left, y - 1 * mm)
    y -= 5 * mm
    txt("(наименование банка получателя платежа)", left + 15 * mm, y, size=6, color=(0.4, 0.4, 0.4))
    y -= 7 * mm

    # БИК и к/с
    txt("БИК 044525593  К/с 30101810200000000593", left, y, size=8, bold=True)
    line_under(left, right_left, y - 1 * mm)
    y -= 5 * mm
    txt("(номер кор./с банка получателя платежа)", left + 15 * mm, y, size=6, color=(0.4, 0.4, 0.4))
    y -= 9 * mm

    # Плательщик
    txt("Плательщик: _______________________________________________", left, y, size=8)
    y -= 5 * mm
    txt("ФИО (полностью)", left + 22 * mm, y, size=6, color=(0.4, 0.4, 0.4))
    y -= 9 * mm

    # Назначение платежа
    txt("Назначение платежа: Оплата за обучение", left, y, size=8)
    c.setStrokeColorRGB(1, 0, 0)
    c.line(left + 34 * mm, y - 1 * mm, right_left, y - 1 * mm)
    y -= 9 * mm

    txt("по профессии _______________________________________________", left, y, size=8)
    y -= 9 * mm

    # Сумма
    txt("Сумма платежа: ________________ руб. ________ коп.", left, y, size=8)

    # --- Правая часть: QR-код ---
    qr_x = mid + 8 * mm
    qr_y = 12 * mm
    qr_size = 55 * mm

    txt("Оплатить можно QR-кодом", qr_x, h - 12 * mm, size=9, bold=True)

    from reportlab.lib.utils import ImageReader
    qr_reader = ImageReader(qr_buf)
    c.drawImage(qr_reader, qr_x, qr_y, width=qr_size, height=qr_size)

    txt("Сканируйте камерой телефона", qr_x + 2 * mm, qr_y - 6 * mm, size=7, color=(0.4, 0.4, 0.4))

    c.save()
    pdf_bytes = buf.getvalue()
    encoded = base64.b64encode(pdf_bytes).decode("utf-8")

    return {
        "statusCode": 200,
        "isBase64Encoded": True,
        "headers": {
            **cors,
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="Kvitanciya_UCGTiN.pdf"',
        },
        "body": encoded,
    }
