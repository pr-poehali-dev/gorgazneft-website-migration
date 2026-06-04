"""Возвращает список .docx и .doc файлов из S3 с прямыми ссылками на скачивание"""
import json
import os
import boto3


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
            lower = key.lower()
            if not (lower.endswith(".docx") or lower.endswith(".doc")):
                continue
            # Имя файла — последняя часть пути
            name = key.split("/")[-1]
            if not name:
                continue
            url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"
            files.append({
                "name": name,
                "url": url,
                "size": obj.get("Size", 0),
            })

    files.sort(key=lambda f: f["name"].lower())

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"files": files}, ensure_ascii=False),
    }