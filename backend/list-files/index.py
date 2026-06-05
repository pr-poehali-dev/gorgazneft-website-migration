"""Возвращает список .docx и .doc файлов из S3 с группировкой по папкам"""
import json
import os
import boto3

DEFAULT_LABEL = "Прочие документы"


def folder_label(key: str) -> str:
    parts = key.split("/")
    if len(parts) < 2:
        return DEFAULT_LABEL
    folder = parts[-2].strip()
    return folder if folder else DEFAULT_LABEL


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    # Режим debug — вернуть все ключи для диагностики
    params = event.get("queryStringParameters") or {}
    debug = params.get("debug") == "1"

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    access_key = os.environ["AWS_ACCESS_KEY_ID"]

    # Пробуем несколько возможных имён бакета (bucket — основной у платформы poehali)
    candidate_buckets = ["bucket", "files", "storage", "documents", "docs", access_key]
    all_keys = []
    files = []
    bucket_found = None
    debug_errors = []

    for candidate in candidate_buckets:
        try:
            paginator = s3.get_paginator("list_objects_v2")
            tmp_keys = []
            for page in paginator.paginate(Bucket=candidate):
                for obj in page.get("Contents", []):
                    tmp_keys.append(obj["Key"])
            bucket_found = candidate
            all_keys = tmp_keys
            break
        except Exception as e:
            debug_errors.append(f"{candidate}: {str(e)[:80]}")
            continue

    # Ищем .doc/.docx в найденных ключах
    for key in (all_keys if bucket_found else []):
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
            "size": 0,
            "folder": folder_label(key),
        })

    files.sort(key=lambda f: (f["folder"].lower(), f["name"].lower()))

    result = {"files": files}
    if debug:
        result["all_keys"] = all_keys
        result["bucket_found"] = bucket_found
        result["errors"] = debug_errors
        result["access_key_prefix"] = access_key[:8] + "..."

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps(result, ensure_ascii=False),
    }