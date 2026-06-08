"""Генерирует PDF квитанцию для оплаты обучения в АНО ДПО УЦГТН"""
import base64
import io
import urllib.request
import tempfile
import os


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    from fpdf import FPDF
    import qrcode
    from PIL import Image as PILImage

    # Скачиваем шрифты Roboto с поддержкой кириллицы
    font_url = "https://github.com/googlefonts/roboto/raw/main/src/hinted/Roboto-Regular.ttf"
    font_bold_url = "https://github.com/googlefonts/roboto/raw/main/src/hinted/Roboto-Bold.ttf"

    font_tmp = tempfile.NamedTemporaryFile(suffix=".ttf", delete=False)
    with urllib.request.urlopen(font_url) as resp:
        font_tmp.write(resp.read())
    font_tmp.close()

    font_bold_tmp = tempfile.NamedTemporaryFile(suffix=".ttf", delete=False)
    with urllib.request.urlopen(font_bold_url) as resp:
        font_bold_tmp.write(resp.read())
    font_bold_tmp.close()

    # Генерируем QR-код по стандарту ЦБ РФ (ST00012)
    # Формат: ST00012|Name=...|PersonalAcc=...|BankName=...|BIC=...|CorrespAcc=...|PayeeINN=...|KPP=...|Purpose=...
    qr_data = (
        "ST00012|"
        "Name=АНО ДПО Учебный центр ГорГазНефть|"
        "PersonalAcc=40703810880690000003|"
        "BankName=АО АЛЬФА-БАНК|"
        "BIC=044525593|"
        "CorrespAcc=30101810200000000593|"
        "PayeeINN=0268104892|"
        "KPP=026801001|"
        "Purpose=Оплата за обучение"
    )

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=2,
    )
    qr.add_data(qr_data)
    qr.make(fit=True)

    qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    qr_tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    qr_img.save(qr_tmp.name, format="PNG", dpi=(300, 300))
    qr_tmp.close()

    pdf = FPDF(orientation="L", unit="mm", format="A5")
    pdf.add_font("Roboto", style="", fname=font_tmp.name)
    pdf.add_font("Roboto", style="B", fname=font_bold_tmp.name)
    pdf.add_page()
    pdf.set_auto_page_break(False)

    W = pdf.w
    H = pdf.h
    mid = W / 2
    left = 8
    rr = mid - 8

    # Пунктирная линия-разделитель
    pdf.set_draw_color(180, 180, 180)
    pdf.set_line_width(0.3)
    pdf.dashed_line(mid, 5, mid, H - 5, dash_length=2, space_length=2)
    pdf.set_line_width(0.2)
    pdf.set_draw_color(0, 0, 0)

    def bold(size=9):
        pdf.set_font("Roboto", style="B", size=size)

    def regular(size=8):
        pdf.set_font("Roboto", style="", size=size)

    def small(size=6):
        pdf.set_font("Roboto", style="", size=size)

    def hline(x1, x2, y):
        pdf.set_draw_color(0, 0, 0)
        pdf.line(x1, y, x2, y)

    y = 12

    # Получатель
    bold(9)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(rr - left, 5, "АНО ДПО «Учебный центр ГорГазНефть»")
    hline(left, rr, y + 5)
    y += 6
    small(6)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(left + 10, y)
    pdf.cell(70, 4, "(наименование получателя платежа)")
    y += 6

    # ИНН и счёт
    bold(8)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(30, 5, "ИНН  0268104892")
    pdf.set_xy(left + 38, y)
    pdf.cell(60, 5, "№  40703810880690000003")
    hline(left + 33, rr, y + 5)
    y += 6
    small(6)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(left, y)
    pdf.cell(33, 4, "(ИНН получателя платежа)")
    pdf.set_xy(left + 38, y)
    pdf.cell(60, 4, "(номер счёта получателя платежа)")
    y += 6

    # Банк
    bold(9)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(rr - left, 5, "АО «АЛЬФА-БАНК»  КПП 026801001")
    hline(left, rr, y + 5)
    y += 6
    small(6)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(left + 15, y)
    pdf.cell(80, 4, "(наименование банка получателя платежа)")
    y += 6

    # БИК и к/с
    bold(8)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(rr - left, 5, "БИК 044525593  К/с 30101810200000000593")
    hline(left, rr, y + 5)
    y += 6
    small(6)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(left + 15, y)
    pdf.cell(80, 4, "(номер кор./с банка получателя платежа)")
    y += 9

    # Плательщик
    regular(8)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(25, 5, "Плательщик: ")
    hline(left + 24, rr, y + 4)
    y += 6
    small(6)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(left + 28, y)
    pdf.cell(40, 4, "ФИО (полностью)")
    y += 8

    # Назначение платежа
    regular(8)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(rr - left, 5, "Назначение платежа: Оплата за обучение")
    pdf.set_draw_color(200, 0, 0)
    pdf.line(left + 40, y + 4, rr, y + 4)
    pdf.set_draw_color(0, 0, 0)
    y += 9

    # по профессии
    regular(8)
    pdf.set_xy(left, y)
    pdf.cell(22, 5, "по профессии ")
    hline(left + 21, rr, y + 4)
    y += 9

    # Сумма
    regular(8)
    pdf.set_xy(left, y)
    pdf.cell(rr - left, 5, "Сумма платежа: ________________ руб. ________ коп.")

    # ---------- ПРАВАЯ ЧАСТЬ ----------
    rx = mid + 8

    bold(9)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(rx, 12)
    pdf.cell(W - rx - 5, 6, "Оплатить можно QR-кодом")

    small(7)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(rx, 20)
    pdf.cell(W - rx - 5, 4, "Стандарт ЦБ РФ · совместим с любым банком")

    qr_size = 62
    qr_y = H - qr_size - 12
    pdf.image(qr_tmp.name, x=rx + 2, y=qr_y, w=qr_size, h=qr_size)

    small(7)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(rx, qr_y + qr_size + 2)
    pdf.cell(W - rx - 5, 4, "Сканируйте камерой телефона")

    os.unlink(font_tmp.name)
    os.unlink(font_bold_tmp.name)
    os.unlink(qr_tmp.name)

    pdf_bytes = pdf.output()
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
