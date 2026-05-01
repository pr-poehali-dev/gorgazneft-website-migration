"""
Скачивает логотип, обрезает до квадрата и загружает иконки 192x192 и 512x512 в S3.
"""
import os
import io
import json
import urllib.request
import boto3
from PIL import Image


LOGO_URL = "https://cdn.poehali.dev/projects/79adcded-2855-4e4c-963b-c613b304c772/bucket/0844bfcb-cc26-4814-8fcb-251231d0e9cd.png"
SIZES = [192, 512]


def make_square(img: Image.Image) -> Image.Image:
    w, h = img.size
    size = max(w, h)
    result = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    offset = ((size - w) // 2, (size - h) // 2)
    result.paste(img, offset, mask=img if img.mode == "RGBA" else None)
    return result


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}, "body": ""}

    with urllib.request.urlopen(LOGO_URL) as resp:
        data = resp.read()

    img = Image.open(io.BytesIO(data)).convert("RGBA")
    square = make_square(img)

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    urls = {}
    for size in SIZES:
        resized = square.resize((size, size), Image.LANCZOS)
        buf = io.BytesIO()
        resized.save(buf, format="PNG", optimize=True)
        buf.seek(0)
        key = f"icons/icon-{size}x{size}.png"
        s3.put_object(Bucket="files", Key=key, Body=buf.read(), ContentType="image/png")
        urls[f"{size}x{size}"] = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True, "urls": urls}),
    }
