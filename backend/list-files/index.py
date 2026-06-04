"""Возвращает список .docx и .doc файлов из S3 с группировкой по папкам"""
import json
import os
import boto3

# Человекочитаемые названия папок
FOLDER_LABELS = {
    "obrazcy":     "Образцы документов",
    "obrazets":    "Образцы документов",
    "polojeniya":  "Положения",
    "polozheniya": "Положения",
    "pravila":     "Правила",
    "dogovory":    "Договоры",
    "dogovor":     "Договоры",
    "zayavleniya": "Заявления",
    "grafiki":     "Графики и планы",
    "programmy":   "Программы",
    "prays":       "Прайс",
    "price":       "Прайс",
}

DEFAULT_LABEL = "Прочие документы"


def folder_label(key: str) -> str:
    parts = key.split("/")
    if len(parts) < 2:
        return DEFAULT_LABEL
    folder = parts[-2].lower().strip()
    # Точное совпадение
    if folder in FOLDER_LABELS:
        return FOLDER_LABELS[folder]
    # Частичное совпадение
    for k, v in FOLDER_LABELS.items():
        if k in folder or folder in k:
            return v
    # Возвращаем исходное имя папки с заглавной буквы
    return folder.capitalize() if folder else DEFAULT_LABEL


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    bucket = "files"
    access_key = os.environ["AWS_ACCESS_KEY_ID"]

    paginator = s3.get_paginator("list_objects_v2")
    files = []

    for page in paginator.paginate(Bucket=bucket):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            lower_key = key.lower()
            if not (lower_key.endswith(".docx") or lower_key.endswith(".doc")):
                continue
            name = key.split("/")[-1]
            if not name:
                continue
            url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"
            files.append({
                "name": name,
                "url": url,
                "size": obj.get("Size", 0),
                "folder": folder_label(key),
            })

    files.sort(key=lambda f: (f["folder"].lower(), f["name"].lower()))

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"files": files}, ensure_ascii=False),
    }
