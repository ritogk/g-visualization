// ＊＊＊＊ ＬＯＣＡＬ ＊＊＊＊
function init() {
    document._video = document.getElementById("videoLocal2");
}
document.addEventListener("DOMContentLoaded", init, false);

function getLocalVideo() {
    return document._video;
}

window.addEventListener('load', function() {
    (function localFileVideoPlayerInit(global) {
        var URL = global.URL || global.webkitURL,
            /**
             * 動画選択時に再生する
             */
            playSelectedFile = function playSelectedFileInit(event) {
                var file = event.target.files[0];
                var type = file.type;
                var videoNode = document.querySelector('video');
                var canPlay = videoNode.canPlayType(type); // 再生できる動画ファイル形式かチェック
                canPlay = (canPlay === '' ? 'no' : canPlay);

                // var message = 'Can play type "' + type + '": ' + canPlay;
                var isError = canPlay === 'no';

                if (isError) {
                    return;
                }

                videoNode.src = URL.createObjectURL(file); // inputで選択した動画を再生する
                videoNode.pause();
            },
            inputNode = document.querySelector('input[type="file"]');

        inputNode.addEventListener('change', playSelectedFile, false);
    }(window));
});




// ＊＊＊＊ YOUTUBE ＊＊＊＊
// IFrame Player API の読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var ytPlayer; // プレイヤー情報

function onYouTubeIframeAPIReady() {
   ytPlayer = new YT.Player(
      'sampleVideo', // 埋め込む場所の指定
      {
         width: 300,         // プレーヤーの幅
         height: 150,        // プレーヤーの高さ
         //videoId: youtubeId, // YouTubeのID
         playerVars: {
            playsinline: 1,   // インライン再生
            rel:0,            // 関連動画の有無(default:1)
            showinfo:0,       // 動画情報表示(default:1)
            controls:0        // コントロール有無(default:1)
         }
      }
   );
}

// 再生速度
function youTubeSpeedControl(num){
   var speed = ytPlayer.getPlaybackRate();
   ytPlayer.setPlaybackRate(speed + num);
}

// ミュート解除
function youMuteRelease(){
   ytPlayer.unMute();
};

// ミュート
function youMute(){
   ytPlayer.mute();
};

function getYouTubeVideo() {
    return ytPlayer;
}
   
// html画面のボタン動作
$(function() {
  // 再生
   $('#play').click(function() {
     ytPlayer.playVideo();
   });
   
   // 一時停止
   $('#pause').click(function() {
      ytPlayer.pauseVideo();
   });
   
   // ボタンクリック【1秒前へ(1)】
   $('#prev100').click(function() {
      youtubeaTime(ytPlayer, -1);
   });
   
   // ボタンクリック【1秒先へ(1)】
   $('#next100').click(function() {
      youtubeaTime(ytPlayer, 1);
   });

   // ボタンクリック【0.5秒前へ(1)】
   $('#prev050').click(function() {
      youtubeaTime(ytPlayer, -0.5);
   });

   // ボタンクリック【0.5秒先へ(1)】
   $('#next050').click(function() {
      youtubeaTime(ytPlayer, 0.5);
   });
   
   // ボタンクリック【0.1秒先へ(1)】
   $('#prev010').click(function() {
      youtubeaTime(ytPlayer, -0.1);
   });
   
   // ボタンクリック【0.05秒先へ(1)】
   $('#prev005').click(function() {
      youtubeaTime(ytPlayer, -0.05);
   });
   
   // ボタンクリック【0.1秒前へ(1)】
   $('#next010').click(function() {
      youtubeaTime(ytPlayer, 0.1);
   });
   
   // ボタンクリック【0.05秒前へ(1)】
   $('#next005').click(function() {
      youtubeaTime(ytPlayer, 0.05);
   });
   
//   // ボタンクリック【ミュート解除(1)】
//   $('#muteRelease').click(function() {
//      muteControl(getPlayer(event), false)
//   });
   
   // 音量アップ(+10)
   $('#volup').click(function() {
      // 現在の音量取得
      var currentVol = ytPlayer.getVolume();
      ytPlayer.setVolume(currentVol + 10);
   });
   
   // 音量ダウン(-10)
   $('#voldown').click(function() {
      // 現在の音量取得
      var currentVol = ytPlayer.getVolume();
      ytPlayer.setVolume(currentVol - 10);
   });
   
   // ミュート
   $('#mute').click(function() {
      // ミュート
      ytPlayer.mute();
   });
   
   // ミュート解除
   $('#muteRelease').click(function() {
      // ミュートの解除
      ytPlayer.unMute();
   });
   
   // 時間制御
   function youtubeaTime(player, second){
      var currentTime = player.getCurrentTime();
      player.seekTo(currentTime + second);
   }
   
   // 対象動画選択
   $('#videoSelct').click(function() {
      // YouTubeId読み込み
      var url =document.getElementById( 'idYou1' ).value;
      var youtubeId
      if(url.length > 11){
         youtubeId = url.substring((url.length - 11),url.length);
      }else{
         youtubeId = url;
      }
      ytPlayer.loadVideoById(youtubeId);
      resize();
   });
   
   // リサイズ
   function resize(){
      var vdWidth = $(window).width();
      var vdHeight = (9/16) * $(window).width();
      ytPlayer.setSize(vdWidth, vdHeight);
   }
   
   // リサイズイベント
   window.onresize = function () {
     resize();
   };
});