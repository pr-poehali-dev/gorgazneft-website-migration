"""Проксирует скачивание docx-файла с CDN с правильным именем"""
import json
import os
import base64
import urllib.request


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    params = event.get("queryStringParameters") or {}
    url = params.get("url", "")
    filename = params.get("filename", "document.docx")

    if not url or not url.startswith("https://cdn.poehali.dev/"):
        return {
            "statusCode": 400,
            "headers": cors,
            "body": json.dumps({"error": "invalid url"}),
        }

    with urllib.request.urlopen(url) as resp:
        data = resp.read()

    encoded = base64.b64encode(data).decode("utf-8")

    return {
        "statusCode": 200,
        "isBase64Encoded": True,
        "headers": {
            **cors,
            "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "Content-Disposition": f'attachment; filename="{filename}"',
        },
        "body": encoded,
    }
