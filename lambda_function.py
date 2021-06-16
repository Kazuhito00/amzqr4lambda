import os
import json
import base64
import tempfile
from io import BytesIO

from PIL import Image
from amzqr4lambda import amzqr


def lambda_handler(event, context):
    try:
        # POST内容パース
        request_json = json.loads(event['body'])
        word = request_json['word']
        base64_image = request_json['image']
        base64_image = base64_image.split(',')

        # 一時保存ディレクトリ生成
        temp_directory = tempfile.TemporaryDirectory()
        temp_file_path = os.path.join(temp_directory.name, "temp.gif")
        save_file_path = os.path.join(temp_directory.name, "download.gif")

        # base64画像デコード
        decode_image = Image.open(BytesIO(base64.b64decode(base64_image[1])))
        decode_image.save(temp_file_path, save_all=True)

        # Amazing-QR生成
        version, level, qr_name = amzqr.run(
            word,
            version=5,
            level='H',
            picture=temp_file_path,
            colorized=True,
            contrast=1.0,
            brightness=1.0,
            save_name="download.gif",
            save_dir=temp_directory.name,
            temp_dir=temp_directory.name,
        )

        # QRコード画像をbase64エンコード
        with open(save_file_path, "rb") as f:
            base64_return_image = base64.b64encode(f.read()).decode("ascii")
        base64_return_image = "data:image/gif;base64," + base64_return_image
        
        # 返却用JSON生成
        json_dict = {}
        json_dict['qrimage'] = base64_return_image
        json_string = json.dumps(json_dict, ensure_ascii=False, indent=4)

        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
            },
            'body': json_string
        }
    except Exception:
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Origin": "*",
            }
        }

