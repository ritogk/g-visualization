window.addEventListener("deviceorientation", function(e){
  // alpha, beta, gammaの値を取得
  let alpha = e.alpha;
  let beta = e.beta;
  let gamma = e.gamma;
  $('#g_x').val(alpha);
  $('#g_y').val(beta);
  $('#g_z').val(gamma);
  this.alert(alpha);
}, false);

window.onload = function () {
  $.ajax({
    type: "GET",
    url: "/analysis/access_youyou",
  })
  $("#select2_read_category").select2({
    dropdownAutoWidth: true,
    width: "100%",
    placeholder: "選択してください。",
  })
  $("#select2_save_category").select2({
    tags: true,
    width: "100%",
    placeholder: "選択してください。",
    dropdownAutoWidth: true,
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
}
// [同時再生]ボタン押下
function btnClick_MultiPlay() {
  if (
    getPlayer(0).getPlayerState() == 3 ||
    getPlayer(0).getPlayerState() == 5 ||
    getPlayer(1).getPlayerState() == 3 ||
    getPlayer(1).getPlayerState() == 5
  )
    return // バッファリング中は再生しない
  // 再生端末判定(PC以外はミュート)
  var ua = navigator.userAgent
  if (
    ua.indexOf("iPhone") > 0 ||
    ua.indexOf("iPod") > 0 ||
    (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
  ) {
    // スマホ
    youMute()
  } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
    // タブレット
    youMute()
  } else {
    // PC
  }
  // 再生
  var clickMe1 = document.getElementById("play")
  var clickMe2 = document.getElementById("play_2")
  clickMe1.click()
  clickMe2.click()
}

// [同時停止]ボタン押下
function btnClick_MultiPause() {
  var clickMe = document.getElementById("pause")
  var clickMe2 = document.getElementById("pause_2")
  clickMe.click()
  clickMe2.click()
}

// [倍速(-)]ボタン押下
function btnClick_MultiSlow() {
  youTubeSpeedControl(-0.25)
}

// [倍速(+)]ボタン押下
function btnClick_MultiFast() {
  youTubeSpeedControl(0.25)
}

// [ﾐｭｰﾄ解除]ボタン押下
function btnClick_MultiMuteRe() {
  youMuteRelease()
}

// [保存]ボタン押下
function btnClick_MultiSave() {
  if ($("#video1_time_st").val() == "") {
    $("#video1_time_st").val(getPlayer(0).getCurrentTime())
    $("#video1_url").val($("#idYou1").val())
  }
  if ($("#video2_time_st").val() == "") {
    $("#video2_time_st").val(getPlayer(1).getCurrentTime())
    $("#video2_url").val($("#idYou2").val())
  }
}

// [セット]ボタン押下
function btnClick_MultiSet() {
  $("#video1_time_st").val(getPlayer(0).getCurrentTime())
  $("#video1_url").val($("#idYou1").val())
  $("#video2_time_st").val(getPlayer(1).getCurrentTime())
  $("#video2_url").val($("#idYou2").val())
  $("#range_filed").show()
  $("#multiSave").show()
  $("#buttonsYou").hide()
  $("#buttonsYou2").hide()
}

// [再読込]ボタン押下
function btnClick_MultiAgain() {
  btnClick_MultiPause()
  getPlayer(0).seekTo($("#video1_time_st").val())
  getPlayer(1).seekTo($("#video2_time_st").val())
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
        $("#idYou1").val(data.video1_url)
        $("#videoSelct").click()
        $("#video1_time_st").val(data.video1_time_st)
        setTimeout(function () {
          document.getElementById("pause").click()
          getPlayer(0).seekTo(data.video1_time_st)
        }, 1300)
        // video2
        $("#idYou2").val(data.video2_url)
        $("#videoSelct2").click()
        $("#video2_time_st").val(data.video2_time_st)
        setTimeout(function () {
          document.getElementById("pause_2").click()
          getPlayer(1).seekTo(data.video2_time_st)
        }, 1300)
        // メモ欄
        $("#memoPanel").show()
        $("#memo_disp").html(data.memo)
        $("#title_disp").html(data.title)
        // 読込欄
        $("#select2_read_category").val(data.id)
        // シーク表示
        $("#range_filed").show()
        // 調整欄非表示
        $("#buttonsYou").hide()
        $("#buttonsYou2").hide()
        // モーダル画面を閉じる
        $("#readModal").modal("hide")
      })
      .fail(function (jqXHR, textStatus, errorThrown) {})
  }, 1000)
}

// youtubeボタン表示切替
function youBtnDispChange(elementId) {
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
      (getPlayer(0).getDuration() - $("#video1_time_st").val()) / 100
    if (getPlayer(0).getDuration() > getPlayer(1).getDuration())
      time_interval =
        (getPlayer(1).getDuration() - $("#video2_time_st").val()) / 100
    document.getElementById("pause").click()
    document.getElementById("pause_2").click()
    getPlayer(0).seekTo(
      Number($("#video1_time_st").val()) + time_interval * val
    )
    getPlayer(1).seekTo(
      Number($("#video2_time_st").val()) + time_interval * val
    )
  })
})
//        // チェンジイベントサンプル
//        $(function($) {
//            $('#test1').change(function() {
//                alert('test');
//            });
//        });

// IFrame Player API の読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 各プレーヤーの格納
var ytPlayer = [];
// 各動画情報
var ytData = [
    {
        id: '',
        area: 'sampleVideo1'
    }, {
        id: '',
        area: 'sampleVideo2'
    }
];

function onYouTubeIframeAPIReady() {
   ytPlayer[0] = new YT.Player(ytData[0]['area'], {
            width: 300,
            height: 150,
            //videoId: ytData[0]['id'],
            playerVars: {
                 autoplay: 0,      // 自動再生させない
                 playsinline: 1,   // インライン再生
                 rel:0,            // 関連動画の有無(default:1)
                 showinfo:0,       // 動画情報表示(default:1)
                 controls:1        // コントロール有無(default:1)
            }
        });
   ytPlayer[1] = new YT.Player(ytData[1]['area'], {
            width: 300,
            height: 150,
            //videoId: ytData[1]['id'],
            playerVars: {
                 autoplay: 0,      // 自動再生させない
                 playsinline: 1,   // インライン再生
                 rel:0,            // 関連動画の有無(default:1)
                 showinfo:0,       // 動画情報表示(default:1)
                 controls:1        // コントロール有無(default:1)
            }
       });
}

// 再生速度
function youTubeSpeedControl(num){
   var speed =  ytPlayer[0].getPlaybackRate();
   ytPlayer[0].setPlaybackRate(speed + num);
   speed =  ytPlayer[1].getPlaybackRate();
   ytPlayer[1].setPlaybackRate(speed + num);
}
// ミュート
function youMute(){
   ytPlayer[0].mute();
   ytPlayer[1].mute();
};
// ミュート解除
function youMuteRelease(){
   ytPlayer[0].unMute();
   ytPlayer[1].unMute();
};

// html画面のボタン動作
$(function() {
   // ボタンクリック【再生(1)】
   $('#play').click(function() {
     youtubePlay(getPlayer(event));
   });
   // ボタンクリック【再生(2)】
   $('#play_2').click(function() {
     youtubePlay(getPlayer(event));
   });
   
   // ボタンクリック【一時停止(1)】
   $('#pause').click(function() {
      youtubePause(getPlayer(event));
   });
   // ボタンクリック【一時停止(2)】
   $('#pause_2').click(function() {
      youtubePause(getPlayer(event));
   });

   // ボタンクリック【1秒前へ(1)】
   $('#prev100').click(function() {
      youtubeaTime(getPlayer(event), -1);
   });
   // ボタンクリック【1秒前へ(2)】
   $('#prev100_2').click(function() {
      youtubeaTime(getPlayer(event), -1);
   });
   
   // ボタンクリック【1秒先へ(1)】
   $('#next100').click(function() {
      youtubeaTime(getPlayer(event), 1);
   });
   // ボタンクリック【1秒先へ(2)】
   $('#next100_2').click(function() {
      youtubeaTime(getPlayer(event), 1);
   });

   // ボタンクリック【0.5秒前へ(1)】
   $('#prev050').click(function() {
      youtubeaTime(getPlayer(event), -0.5);
   });
   // ボタンクリック【0.5秒前へ(2)】
   $('#prev050_2').click(function() {
      youtubeaTime(getPlayer(event), -0.5);
   });

   // ボタンクリック【0.5秒先へ(1)】
   $('#next050').click(function() {
      youtubeaTime(getPlayer(event), 0.5);
   });
   // ボタンクリック【0.5秒先へ(2)】
   $('#next050_2').click(function() {
      youtubeaTime(getPlayer(event), 0.5);
   });
   
   // ボタンクリック【0.1秒先へ(1)】
   $('#prev010').click(function() {
      youtubeaTime(getPlayer(event), -0.1);
   });
   // ボタンクリック【0.1秒先へ(2)】
   $('#prev010_2').click(function() {
      youtubeaTime(getPlayer(event), -0.1);
   });
   // ボタンクリック【0.05秒先へ(1)】
   $('#prev005').click(function() {
      youtubeaTime(getPlayer(event), -0.05);
   });
   // ボタンクリック【0.05秒先へ(2)】
   $('#prev005_2').click(function() {
      youtubeaTime(getPlayer(event), -0.05);
   });
   
   // ボタンクリック【0.1秒前へ(1)】
   $('#next010').click(function() {
      youtubeaTime(getPlayer(event), 0.1);
   });
   // ボタンクリック【0.1秒前へ(2)】
   $('#next010_2').click(function() {
      youtubeaTime(getPlayer(event), 0.1);
   });
   // ボタンクリック【0.05秒前へ(1)】
   $('#next005').click(function() {
      youtubeaTime(getPlayer(event), 0.05);
   });
   // ボタンクリック【0.05秒前へ(2)】
   $('#next005_2').click(function() {
      youtubeaTime(getPlayer(event), 0.05);
   });
   
   // ボタンクリック【ミュート解除(1)】
   $('#muteRelease').click(function() {
      muteControl(getPlayer(event), false)
   });
   // ボタンクリック【ミュート解除(2)】
   $('#muteRelease_2').click(function() {
      muteControl(getPlayer(event), false)
   });
   
   // 再生
   function youtubePlay(player){
      player.playVideo();
   }
   // 一時停止
   function youtubePause(player){
      player.pauseVideo();
   }
   // 時間制御
   function youtubeaTime(player, second){
      var currentTime = player.getCurrentTime();
      player.seekTo(currentTime + second);
   }

   // ミュートコントロール
   function muteControl(player, muteFlg){
      if(muteFlg){
         player.mute();
      }else{
         player.unMute();
      }
   }

   // 対象動画選択
   $('#videoSelct').click(function() {
        var vdWidth = $(window).width();
        var vdHeight = (9/16) * $(window).width();
        var youtubeId = getYoutubeId(document.getElementById( 'idYou1' ).value);
        if(youtubeId != ""){
           ytData[0]['id'] = youtubeId;
           ytPlayer[0].loadVideoById(youtubeId);
           resize();
        }
   });
   
   // 対象動画選択
   $('#videoSelct2').click(function() {
        var vdWidth = $(window).width();
        var vdHeight = (9/16) * $(window).width();
        
        var youtubeId = getYoutubeId(document.getElementById( 'idYou2' ).value);
        if(youtubeId != ""){
           ytData[1]['id'] = youtubeId;
           ytPlayer[1].loadVideoById(youtubeId);
           resize();
        }
   });
   
   // リサイズ
   function resize(){
      var vdWidth = $(window).width();
      var vdHeight = (9/16) * $(window).width();
      ytPlayer[0].setSize(vdWidth, vdHeight);
      ytPlayer[1].setSize(vdWidth, vdHeight);
   }
   
   // リサイズイベント
   window.onresize = function () {
     resize();
   };
   
   // youtubeId取得
   function getYoutubeId(url){
      var youtubeId
      if(url.length > 11){
         youtubeId = url.substring((url.length - 11),url.length);
      }else{
         youtubeId = url;
      }
      return youtubeId;
   }
   
   // 対象プレイヤー取得
   function getPlayer(eventDom){
      var player
      var id_name = eventDom.target.parentNode.getAttribute("id");
      if(id_name == "buttonsYou"){
        player = ytPlayer[0];
     }else if(id_name == "buttonsYou2"){
        player = ytPlayer[1];
     }
     return player;
   }
});

// 対象プレイヤー取得2
function getPlayer(index){
   return ytPlayer[index];
}