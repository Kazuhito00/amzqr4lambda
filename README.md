# amzqr4lambda
[Amazing-QR](https://github.com/x-hw/amazing-qr)をAWS Lambda上で動かしたサンプルです。<br>
Amazing-QRを用いて画像ファイルやアニメGifを用いたQRコードが作成できます(埋め込める情報は半角英数字)<br><br>
<img src="https://user-images.githubusercontent.com/37477845/122220319-2ea2f500-ceeb-11eb-9bf8-2e702e17035f.gif" width="50%">

# Demo
<img src="https://user-images.githubusercontent.com/37477845/122236282-57ca8200-cef9-11eb-9691-eea0a44d5461.gif" width="25%">
デモページは以下です。<br>
いったん、リクエスト回数を10000回/月に制限しています。<br>
制限がかかっていてもご容赦ください。<br>
https://kazuhito00.github.io/amzqr4lambda/html/index.html<br><br>

コーヒーを奢ることで制限が緩和されるかもしれません☕
<a href="https://www.buymeacoffee.com/Kazuhito00" target="_blank"><br><img src="https://cdn.buymeacoffee.com/buttons/default-white.png" alt="Buy Me A Coffee" height="36" width="170" ><br><br>
 
# Demo Architecture
デモの構成は以下のようになっています。<br>
アップロード画像はLambdaの一時領域に格納し、Lambda呼び出し完了時に破棄します。<br>
アップロード画像、テキストはサーバー上に保持しないようにしています。<br>
<img src="https://user-images.githubusercontent.com/37477845/122246239-58671680-cf01-11eb-8cf9-37504f502ae5.png" width="75%">

# Reference
* [x-hw/amazing-qr](https://github.com/x-hw/amazing-qr)

# Author
高橋かずひと(https://twitter.com/KzhtTkhs)
 
# License 
amzqr4lambda is under [GPL-3.0 License](LICENSE).
