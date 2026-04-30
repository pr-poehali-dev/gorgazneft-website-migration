"""Отправка заявки на курс на почту gorgazneft@mail.ru"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        phone = body.get("phone", "").strip()
        email = body.get("email", "").strip()
        course = body.get("course", "Не выбран")
        comment = body.get("comment", "")

        if not name or not phone or not email:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": "Заполните обязательные поля"}),
            }

        smtp_password = os.environ.get("SMTP_PASSWORD", "")
        sender = "gorgazneft@mail.ru"
        recipient = "gorgazneft@mail.ru"

        subject = f"Новая заявка на курс: {course}"

        html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a3a6b; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">
              📋 Новая заявка на обучение
            </h2>
            <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">
              АНО ДПО «Учебный центр ГорГазНефть»
            </p>
          </div>
          <div style="background: #f8f9fb; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 140px;">Имя</td>
                <td style="padding: 10px 0; font-weight: 600; color: #1e293b;">{name}</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Телефон</td>
                <td style="padding: 10px 0; font-weight: 600; color: #1e293b;">{phone}</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; font-weight: 600; color: #1e293b;">{email}</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Курс</td>
                <td style="padding: 10px 0; font-weight: 600; color: #1a3a6b;">{course}</td>
              </tr>
              {"<tr style='border-top: 1px solid #e2e8f0;'><td style='padding: 10px 0; color: #64748b; font-size: 13px;'>Комментарий</td><td style='padding: 10px 0; color: #1e293b;'>" + comment + "</td></tr>" if comment else ""}
            </table>
          </div>
        </div>
        """

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = sender
        msg["To"] = recipient
        msg.attach(MIMEText(html, "html", "utf-8"))

        with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
            server.login(sender, smtp_password)
            server.sendmail(sender, recipient, msg.as_string())

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({"success": True}),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": str(e)}),
        }
