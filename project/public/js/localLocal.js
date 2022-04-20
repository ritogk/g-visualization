window.onload = function () {
  $.ajax({
    type: "GET",
    url: "/analysis/access_locallocal",
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
    document.getElementById("videoLocal1").muted = true
    document.getElementById("videoLocal2").muted = true
  } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
    // タブレット
    document.getElementById("videoLocal1").muted = true
    document.getElementById("videoLocal2").muted = true
  } else {
    // PC
  }
  // 再生
  var clickMe = document.getElementById("playLocal1")
  var clickMeYou = document.getElementById("playLocal2")
  clickMe.click()
  clickMeYou.click()
}

// [同時停止]ボタン押下
function btnClick_MultiPause() {
  var clickMe = document.getElementById("pauseLocal1")
  var clickMe2 = document.getElementById("pauseLocal2")
  clickMe.click()
  clickMe2.click()
}

// [倍速(-)]ボタン押下
function btnClick_MultiSlow() {
  var localvideo1 = document.getElementById("videoLocal1")
  var localvideo2 = document.getElementById("videoLocal2")
  localvideo1.playbackRate -= 0.25
  localvideo2.playbackRate -= 0.25
}

// [倍速(+)]ボタン押下
function btnClick_MultiFast() {
  var localvideo1 = document.getElementById("videoLocal1")
  var localvideo2 = document.getElementById("videoLocal2")
  localvideo1.playbackRate += 0.25
  localvideo2.playbackRate += 0.25
}

// [ﾐｭｰﾄ解除]ボタン押下
function btnClick_MultiMuteRe() {
  var localvideo1 = document.getElementById("videoLocal1")
  var localvideo2 = document.getElementById("videoLocal2")
  multeReleaseLocal(localvideo1)
  window.setTimeout(multeReleaseLocal(localvideo2), 500)
}
// ミュート解除(Local)
function multeReleaseLocal(video) {
  video.muted = false
}

// [保存]ボタン押下
function btnClick_MultiSave() {
  if ($("#video1_time_st").val() == "") {
    $("#video1_time_st").val(getPlayerIndex(0).currentTime)
    $("#video1_url").val($("#fileSelLocal1").val())
  }
  if ($("#video2_time_st").val() == "") {
    $("#video2_time_st").val(getPlayerIndex(1).currentTime)
    $("#video2_url").val($("#fileSelLocal2").val())
  }
}

// [セット]ボタン押下
function btnClick_MultiSet() {
  $("#video1_time_st").val(getPlayerIndex(0).currentTime)
  $("#video1_url").val($("#fileSelLocal1").val())
  $("#video2_time_st").val(getPlayerIndex(1).currentTime)
  $("#video2_url").val($("#fileSelLocal2").val())
  $("#range_filed").show()
  $("#multiSave").show()
  $("#buttonsLocal1").hide()
  $("#buttonsLocal2").hide()
}

// [再読込]ボタン押下
function btnClick_MultiAgain() {
  btnClick_MultiPause()
  getPlayerIndex(0).currentTime = $("#video1_time_st").val()
  getPlayerIndex(1).currentTime = $("#video2_time_st").val()
}

// 読込
function read(comparison_id) {
  setTimeout(function () {
    $.ajax({
      type: "GET",
      url: "/ajax/find-comparsion/" + comparison_id,
    })
      .done(function (data, textStatus, jqXHR) {
        // video1
        //$('#fileSelLocal1').val(data.video1_url);
        $("#video1_time_st").val(data.video1_time_st)
        setTimeout(function () {
          document.getElementById("pauseLocal1").click()
          getPlayerIndex(0).currentTime = data.video1_time_st
        }, 1300)
        // video2
        //$('#fileSelLocal2').val(data.video2_url);
        $("#video2_time_st").val(data.video2_time_st)
        setTimeout(function () {
          document.getElementById("pauseLocal2").click()
          getPlayerIndex(1).currentTime = data.video2_time_st
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
        $("#fileSelLocal1_label").show()
        $("#fileSelLocal2_label").show()
        // 調整欄非表示
        $("#buttonsLocal1").hide()
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
      (getPlayerIndex(0).duration - $("#video1_time_st").val()) / 100
    if (getPlayerIndex(0).duration > getPlayerIndex(1).duration)
      time_interval =
        (getPlayerIndex(1).duration - $("#video2_time_st").val()) / 100
    document.getElementById("pauseLocal1").click()
    document.getElementById("pauseLocal2").click()
    getPlayerIndex(0).currentTime =
      Number($("#video1_time_st").val()) + time_interval * val
    getPlayerIndex(1).currentTime =
      Number($("#video2_time_st").val()) + time_interval * val
  })

  $("#fileSelLocal1").on("change", function () {
    if ($("#fileSelLocal1").val() === "") {
      $("#fileSelLocal1_label").show()
    } else {
      $("#fileSelLocal1_label").hide()
    }
  })

  $("#fileSelLocal2").on("change", function () {
    if ($("#fileSelLocal2").val() === "") {
      $("#fileSelLocal2_label").show()
    } else {
      $("#fileSelLocal2_label").hide()
    }
  })
})
//        // チェンジイベントサンプル
//        $(function($) {
//            $('#test1').change(function() {
//                alert('test');
//            });
//        });


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