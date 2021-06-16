#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import base64
from io import BytesIO

from PIL import Image
from amzqr4lambda import amzqr

words = 'https://github.com/Kazuhito00/amzqr4lambda'

version, level, qr_name = amzqr.run(
    words,
    version=5,
    level='H',
    picture='image/sample.jpg',
    colorized=True,
    contrast=1.0,
    brightness=1.0,
    save_name='image/sample_qr.gif',
    save_dir=os.getcwd(),
    temp_dir='./',
)
