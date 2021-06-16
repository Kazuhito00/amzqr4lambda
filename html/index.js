// 画像ドラッグドロップ関連
var dragDropArea = document.getElementById('dragDropArea');
dragDropArea.addEventListener('dragover', function(event){
    event.preventDefault();
    dragDropArea.classList.add('dragover');
});
dragDropArea.addEventListener('dragleave', function(event){
    event.preventDefault();
    dragDropArea.classList.remove('dragover');
});
dragDropArea.addEventListener('drop', function(event){
    event.preventDefault();
    dragDropArea.classList.remove('dragenter');

    // ドロップファイル情報取得
    var files = event.dataTransfer.files;
    console.table(files);

    // 入力フォーム情報更新
    var fileInput = document.getElementById('fileInput');
    fileInput.files = files;

    // プレビュー画像更新
    photoPreview('onChenge', files[0]);
});

// プレビュー画像更新
function photoPreview(event, f=null) {
    console.table(f)
    var file = f;
    if(file === null){
        file = event.target.files[0];
    }

    // 画像ファイルサイズチェック
    var file_size = file.size / 1024 / 1024;
    if (file_size > 1) {
        alert('画像ファイルのサイズは1MB以下にしてください。');
        return;
    }

    // プレビューエリア初期化
    var reader = new FileReader();
    var previewArea = document.getElementById("previewArea");
    var previewImage = document.getElementById("previewImage");
    if(previewImage != null) {
        previewArea.removeChild(previewImage);
    }

    reader.onload = function(event) {
        // ローディング開始
        var loading = document.getElementById("loading");
        loading.style.visibility ="visible";

        // プレビュー画像表示
        var img = document.createElement("img");
        img.setAttribute("src", reader.result);
        img.setAttribute("id", "previewImage");
        img.onload = function(){
            if(img.width > 500){
                img.width = 500;
            }
            previewArea.appendChild(img);
        };

        // QRコード生成リクエスト
        var qrText = document.getElementById("qrText");
        postCreateAqr(qrText.value, reader.result);
    };

    reader.readAsDataURL(file);

    // 入力フォーム情報削除(
    // ※入力フォーム利用時に同じ画像を続けてアップロードできるように
    document.getElementById("fileInput").value = '';
}

// QRコード生成リクエスト
function postCreateAqr(text, base64_image) {
    request_url = 'https://zmt4v931v3.execute-api.ap-northeast-1.amazonaws.com/api/create_aqr'
    api_key = 'AnMGr3ZGnn7dRqhXqxc5B196eG6GCOlhahNdL09B'
    let data = {
        word: text,
        image: base64_image
    }

    fetch(request_url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key
        },
        body: JSON.stringify(data),
    })
    .then(
        response => response.json()
    )
    .then(data => {
        console.log('Success:', data);

        // ローディング終了
        var loading = document.getElementById("loading");
        loading.style.visibility ="hidden"; 
        
        // エラーメッセージ非表示
        var errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display ="none"; 
        
        // QRコード画像表示
        var image = document.getElementById("image");
        image.src = data.qrimage;      
    })
    .catch((error) => {
        console.error('Error:', error);

        // ローディング終了
        var loading = document.getElementById("loading");
        loading.style.visibility ="hidden"; 

        // エラーメッセージ表示
        var errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display ="block";                     
    });
}
        
// テキストボックス用バリデーション
function checkForm($this) {
    var temp = $this.value.split("");

    for(var cnt=0; cnt < temp.length; cnt++) {
        if(temp[cnt].match(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/)==null){
            temp[cnt] = "";
        }
    }
    $this.value=temp.join("");
}