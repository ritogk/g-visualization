
// 各動画情報
var vlData = [
    {
        document,
        area: 'videoLocal1',
        input: 'fileSelLocal1',
        message: 'messageLocal1'
    }, {
        document,
        area: 'videoLocal2',
        input: 'fileSelLocal2',
        message: 'messageLocal2'
    }
];

// 初期化
function init() {
    vlData[0][0] = document.getElementById("videoLocal1");
    vlData[1][0] = document.getElementById("videoLocal2");
}
document.addEventListener("DOMContentLoaded", init, false);

function getVideo() {
    return getPlayer(event.target.parentNode);
}

function muteLocal() {
    vlData[0][0].muted = true;
    vlData[1][0].muted = false;
}


// 対象プレイヤー取得
function getPlayer(dom){
    var player
    var id_name = dom.parentNode.getAttribute("id");
    if(id_name == "videoLocalBord1"){
       player = vlData[0][0];
    }else if(id_name == "videoLocalBord2"){
       player = vlData[1][0];
    }
    return player;
}

function getPlayerIndex(index){
    if(index === 0){
       player = vlData[0][0];
    }else{
       player = vlData[1][0];
    }
    return player;
}

// 対象メッセージ取得
function getMessage(dom){
    var message;
    var id_name = dom.parentNode.getAttribute("id");
    if(id_name == "videoLocalBord1"){
       message = document.querySelector('#' + vlData[0]['message']);
    }else if(id_name == "videoLocalBord2"){
       message = document.querySelector('#' + vlData[1]['message']);
    }
    return message;
}

// html読み込み後実行
//window.onload = function () {
window.addEventListener('DOMContentLoaded', function() {
    (function localFileVideoPlayerInit(global) {
        // /**
        //  * メッセージ
        //  **/
        // displayMessage = (function displayMessageInit() {
        //     //var node = document.querySelector('#messageLocal1');
        //     return function displayMessage(message, isError) {
        //         var msgNode = getMessage(event.target);
        //         msgNode.innerHTML = message;
        //         msgNode.className = isError ? 'error' : 'info';
        //     };
        // }())
        /**
         * 動画選択時に再生する
         **/
        playSelectedFile = function playSelectedFileInit(event) {
            var file = event.target.files[0];
            var type = file.type;
            var videoNode =getPlayer(event.target);
            var canPlay = videoNode.canPlayType(type); // 再生できる動画ファイル形式かチェック
            canPlay = (canPlay === '' ? 'no' : canPlay);

            var message = 'Can play type "' + type + '": ' + canPlay;
            var isError = canPlay === 'no';

            // displayMessage(message, isError);

            if (isError) {
                return;
            }

            videoNode.src = URL.createObjectURL(file); // inputで選択した動画を再生する
            videoNode.pause();
        }
        
        var inputNode1 = document.querySelector('input[id="fileSelLocal1"]');
        var inputNode2 = document.querySelector('input[id="fileSelLocal2"]');
        inputNode1.addEventListener('change', playSelectedFile, false);
        inputNode2.addEventListener('change', playSelectedFile, false);
    }(window));
});