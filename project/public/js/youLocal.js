window.onload = function () {
  $.ajax({
    type: "GET",
    url: "/analysis/access_youlocal",
  })
  $("#select2_read_category").select2({
    dropdownAutoWidth: true,
    width: "100%",
    placeholder: "選択してください。",
  })
  $("#select2_save_category").select2({
    tags: true,
    dropdownAutoWidth: true,
    width: "100%",
    placeholder: "選択してください。",
    dropdownParent: $("#saveModal .modal-content"),
  })
  // 読み込み
  if (global_read_id) read(global_read_id)
  // Apple端末Chrome以外の時「倍速」ボタンを非活性
  var userAgent = window.navigator.userAgent
  if (
    userAgent.indexOf("iPhone") != -1 ||
    userAgent.indexOf("iPod") != -1 ||
    userAgent.indexOf("iPad") != -1
  ) {
    if (userAgent.indexOf("CriOS") == -1) {
      document.getElementById("multiSlow").disabled = true
      document.getElementById("multiFast").disabled = true
    }
  }
  //setInterval("showNowDate()", 100); // 1秒毎に処理を実行
}
// [同時再生]ボタン押下
function btnClick_MultiPlay() {
  //if(getPlayer(0).getPlayerState() == 3 || getPlayer(0).getPlayerState() == 5 || getPlayer(1).getPlayerState() == 3 || getPlayer(1).getPlayerState() == 5) return; // バッファリング中は再生しない
  // 再生端末判定(PC以外はミュート)
  var ua = navigator.userAgent
  if (
    ua.indexOf("iPhone") > 0 ||
    ua.indexOf("iPod") > 0 ||
    (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
  ) {
    // スマホ
    getLocalVideo().muted = true
    getYouTubeVideo().mute()
  } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
    // タブレット
    getLocalVideo().muted = true
    getYouTubeVideo().mute()
  } else {
    // PC
  }
  // 再生
  var clickMe = document.getElementById("play")
  var clickMeYou = document.getElementById("playLocal2")
  clickMe.click()
  clickMeYou.click()
}

// [同時停止]ボタン押下
function btnClick_MultiPause() {
  var clickMe = document.getElementById("pause")
  var clickMe2 = document.getElementById("pauseLocal2")
  clickMe.click()
  clickMe2.click()
}

// [倍速(-)]ボタン押下
function btnClick_MultiSlow() {
  getLocalVideo().playbackRate -= 0.25
  youTubeSpeedControl(-0.25)
}

// [倍速(+)]ボタン押下
function btnClick_MultiFast() {
  getLocalVideo().playbackRate += 0.25
  youTubeSpeedControl(0.25)
}

// [ﾐｭｰﾄ解除]ボタン押下
function btnClick_MultiMuteRe() {
  multeReleaseLocal(getLocalVideo())
  youMuteRelease()
}
// ミュート解除(Local)
function multeReleaseLocal(video) {
  video.muted = false
  getYouTubeVideo().unMute()
}

// [保存]ボタン押下
function btnClick_MultiSave() {
  if ($("#video1_time_st").val() == "") {
    $("#video1_time_st").val(getYouTubeVideo().getCurrentTime())
    $("#video1_url").val($("#idYou1").val())
  }
  if ($("#video2_time_st").val() == "") {
    $("#video2_time_st").val(getLocalVideo().currentTime)
    $("#video2_url").val($("#fileSelLocal2").val())
  }
}

// [セット]ボタン押下
function btnClick_MultiSet() {
  $("#video1_time_st").val(getYouTubeVideo().getCurrentTime())
  $("#video1_url").val($("#idYou1").val())
  $("#video2_time_st").val(getLocalVideo().currentTime)
  $("#video2_url").val($("#fileSelLocal2").val())
  $("#range_filed").show()
  $("#multiSave").show()
  $("#buttonsYou").hide()
  $("#buttonsLocal2").hide()
}

// [再読込]ボタン押下
function btnClick_MultiAgain() {
  btnClick_MultiPause()
  getYouTubeVideo().seekTo($("#video1_time_st").val())
  getLocalVideo().currentTime = $("#video2_time_st").val()
}

// 読込
function read(comparison_id) {
  // if(getYouTubeVideo().getPlayerState() == 3 || getYouTubeVideo().getPlayerState() == 5) return; // バッファリング中は再生しない
  setTimeout(function () {
    $.ajax({
      type: "GET",
      url: "/ajax/find-comparsion/" + comparison_id,
    })
      .done(function (data, textStatus, jqXHR) {
        // video1
        $("#idYou1").val(data.video1_url)
        $("#videoSelct").click()
        $("#video1_time_st").val(data.video1_time_st)
        setTimeout(function () {
          document.getElementById("pause").click()
          getYouTubeVideo().seekTo(data.video1_time_st)
        }, 1300)

        // video2
        //$('#fileSelLocal2').val(data.video2_url);
        $("#video2_time_st").val(data.video2_time_st)
        setTimeout(function () {
          document.getElementById("pauseLocal2").click()
          getLocalVideo().currentTime = data.video2_time_st
        }, 1300)
        // メモ欄
        $("#memoPanel").show()
        $("#memo_disp").html(data.memo)
        $("#title_disp").html(data.title)
        // 読込欄
        $("#select2_read_category").val(data.id)
        // シーク表示
        $("#range_filed").show()
        // 選択ラベル表示
        $("#fileSelLocal2_label").show()
        // 調整欄非表示
        $("#buttonsYou").hide()
        $("#buttonsLocal2").hide()
        // モーダル画面を閉じる
        $("#readModal").modal("hide")
      })
      .fail(function (jqXHR, textStatus, errorThrown) {})
  }, 1000)
}

// ボタン表示切替
function dispChange(elementId) {
  if ($(elementId).css("display") == "block") {
    $(elementId).hide()
  } else {
    $(elementId).show()
  }
}

// スライダー変更イベント
$(function ($) {
  $(".slider").on("input", function () {
    let val = $(this).val()
    let time_interval =
      (getYouTubeVideo().getDuration() - $("#video1_time_st").val()) / 100
    if (getYouTubeVideo().getDuration() > getLocalVideo().duration)
      time_interval =
        (getLocalVideo().duration - $("#video2_time_st").val()) / 100
    document.getElementById("pause").click()
    document.getElementById("pauseLocal2").click()
    getYouTubeVideo().seekTo(
      Number($("#video1_time_st").val()) + time_interval * val
    )
    getLocalVideo().currentTime =
      Number($("#video2_time_st").val()) + time_interval * val
  })

  $("#fileSelLocal2").on("change", function () {
    if ($("#fileSelLocal2").val() === "") {
      $("#fileSelLocal2_label").show()
    } else {
      $("#fileSelLocal2_label").hide()
    }
  })
})

// youtubeボタン表示切替
function youBtnDispChange(elementId) {
  if ($(elementId).css("display") == "block") {
    $(elementId).hide()
  } else {
    $(elementId).show()
  }
}

//        // チェンジイベントサンプル
//        $(function($) {
//            $('#test1').change(function() {
//                alert('test');
//            });
//        });

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