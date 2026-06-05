"""Генерирует PDF квитанцию для оплаты обучения в АНО ДПО УЦГТН"""
import base64
import io
import urllib.request


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    from fpdf import FPDF
    from PIL import Image as PILImage

    # Скачиваем QR-код
    qr_url = "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/bucket/72c27b20-f126-4633-ac5e-1872acb88dc6.png"
    with urllib.request.urlopen(qr_url) as resp:
        qr_data = resp.read()

    # Сохраняем QR во временный файл (fpdf2 требует путь)
    import tempfile, os
    tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    tmp.write(qr_data)
    tmp.close()
    qr_path = tmp.name

    pdf = FPDF(orientation="L", unit="mm", format="A5")
    pdf.add_page()
    pdf.set_auto_page_break(False)

    W = pdf.w   # ~210mm (A5 landscape width)
    H = pdf.h   # ~148mm

    mid = W / 2

    # Фон белый — по умолчанию

    # Пунктирная линия-разделитель
    pdf.set_draw_color(180, 180, 180)
    pdf.set_line_width(0.3)
    pdf.dashed_line(mid, 5, mid, H - 5, dash_length=2, space_length=2)
    pdf.set_line_width(0.2)
    pdf.set_draw_color(0, 0, 0)

    left = 8
    rr = mid - 8   # правая граница левой части

    def bold(size=9):
        pdf.set_font("helvetica", style="B", size=size)

    def regular(size=8):
        pdf.set_font("helvetica", style="", size=size)

    def small(size=6):
        pdf.set_font("helvetica", style="", size=size)

    def hline(x1, x2, y):
        pdf.set_draw_color(0, 0, 0)
        pdf.line(x1, y, x2, y)

    # ---------- ЛЕВАЯ ЧАСТЬ ----------
    y = 12

    # Получатель
    bold(9)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(rr - left, 5, "ANO DPO «Uchebny Centr GorGazNeft»", ln=0)
    hline(left, rr, y + 5)
    y += 6
    small(6)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(left + 10, y)
    pdf.cell(50, 4, "(naimenovanie poluchatelya platezha)")
    y += 6

    # ИНН и счёт
    bold(8)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(30, 5, "INN  0268104892")
    pdf.set_xy(left + 38, y)
    pdf.cell(60, 5, "No.  40703810880690000003")
    hline(left + 33, rr, y + 5)
    y += 6
    small(6)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(left, y)
    pdf.cell(33, 4, "(INN poluchatelya)")
    pdf.set_xy(left + 38, y)
    pdf.cell(60, 4, "(nomer scheta poluchatelya platezha)")
    y += 6

    # Банк
    bold(9)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(rr - left, 5, "AO \"ALFA-BANK\"  KPP 026801001")
    hline(left, rr, y + 5)
    y += 6
    small(6)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(left + 15, y)
    pdf.cell(80, 4, "(naimenovanie banka poluchatelya platezha)")
    y += 6

    # БИК и к/с
    bold(8)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(rr - left, 5, "BIK 044525593  K/s 30101810200000000593")
    hline(left, rr, y + 5)
    y += 6
    small(6)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(left + 15, y)
    pdf.cell(80, 4, "(nomer kor./s banka poluchatelya platezha)")
    y += 9

    # Плательщик
    regular(8)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(25, 5, "Platelshchik: ")
    hline(left + 24, rr, y + 4)
    y += 6
    small(6)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(left + 28, y)
    pdf.cell(40, 4, "FIO (polnostyu)")
    y += 8

    # Назначение платежа
    regular(8)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(left, y)
    pdf.cell(rr - left, 5, "Naznachenie platezha: Oplata za obuchenie")
    pdf.set_draw_color(200, 0, 0)
    pdf.line(left + 38, y + 4, rr, y + 4)
    pdf.set_draw_color(0, 0, 0)
    y += 9

    # по профессии
    regular(8)
    pdf.set_xy(left, y)
    pdf.cell(20, 5, "po professii ")
    hline(left + 19, rr, y + 4)
    y += 9

    # Сумма
    regular(8)
    pdf.set_xy(left, y)
    pdf.cell(rr - left, 5, "Summa platezha: ________________ rub. ________ kop.")

    # ---------- ПРАВАЯ ЧАСТЬ ----------
    rx = mid + 8

    bold(9)
    pdf.set_text_color(0, 0, 0)
    pdf.set_xy(rx, 12)
    pdf.cell(W - rx - 5, 6, "Oplatit mozhno QR-kodom")

    # QR-код
    qr_size = 58
    qr_y = H - qr_size - 14
    pdf.image(qr_path, x=rx + 2, y=qr_y, w=qr_size, h=qr_size)

    small(7)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(rx, qr_y + qr_size + 2)
    pdf.cell(W - rx - 5, 4, "Skaniruyte kameroj telefona")

    os.unlink(qr_path)

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
