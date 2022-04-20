// 可読度センサー有効 押下
function ClickDeviceMotionSensor(){
	DeviceMotionEvent.requestPermission()
    .then(permissionState => {
      if (permissionState === 'granted') {
        // 許可を得られた場合、devicemotionをイベントリスナーに追加
        window.addEventListener('devicemotion', devicemotion)
      } else {
        // 許可を得られなかった場合の処理
      }
    })
    .catch(console.error) // https通信でない場合などで許可を取得できなかった場合
}

function ClickRequestDeviceSensor(){
	//. ユーザーに「許可」を求めるダイアログを表示
	DeviceOrientationEvent.requestPermission().then( function( response ){
	  if( response === 'granted' ){
		//. 許可された場合のみイベントハンドラを追加できる
		window.addEventListener( "deviceorientation", deviceOrientation );
		//. 画面上部のボタンを消す
		$('#sensorrequest').css( 'display', 'none' );
	  }
	}).catch( function( e ){
	  console.log( e );
	});
  }
  
  //. DeviceOrientationEvent オブジェクトが有効な環境か？　をチェック
  if( window.DeviceOrientationEvent ){
	//. iOS13 以上であれば DeviceOrientationEvent.requestPermission 関数が定義されているので、ここで条件分岐
	if( DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function' ){
	  //. iOS 13 以上の場合、
	  //. 画面上部に「センサーの有効化」ボタンを追加
	  var banner = '<div  style="z-index: 1; position: absolute; width: 100%; background-color: rgb(0, 0, 0);" onclick="ClickRequestDeviceSensor();" id="sensorrequest"><p style="color: rgb(0, 0, 255);">センサーの有効化</p></div>';
	  $('body').prepend( banner );
	}else{
	  //. Android または iOS 13 未満の場合、
	  //. DeviceOrientationEvent オブジェクトが有効な場合のみ、deviceorientation イベント発生時に deviceOrientaion 関数がハンドリングするよう登録
	  window.addEventListener( "deviceorientation", deviceOrientation );
	}
  }

var dir = 0;   //. 北極方向に対する向きの角度 z軸 0 - 360
var fb = 0;      //. 前後の傾き角度 x軸 -180 - 180
var lr = 0;  //. 左右の傾き角度 y軸 -90 - 90

  //. deviceorientation イベントハンドラ
  function deviceOrientation( e ){
	//. 通常の処理を無効にする
	e.preventDefault();
  
	//. スマホの向きを取得
	// iphoneとandroidで向きが逆なので-1を掛けて任意に修正
	dir = e.alpha * -1;   //. 北極方向に対する向きの角度 z軸 0 - 360
	fb = e.beta * -1;      //. 前後の傾き角度 x軸 -180 - 180
	lr = e.gamma * -1;  //. 左右の傾き角度 y軸 -90 - 90

	$('#g_x').val(fb);
	$('#g_y').val(lr);
	$('#g_z').val(dir);

	vec.x = e.gamma / 5;
	vec.y = e.beta / 5;

	const source = audioContext.createBufferSource();
    source.buffer = createAudioBuffer(dir+fb+lr, 0.5);
    source.connect(audioContext.destination);
    source.start();
  }


  function createAudioBuffer(freq, sec) {
	const frameCount = audioContext.sampleRate * sec;
	const audioBuffer = audioContext.createBuffer(1, frameCount, audioContext.sampleRate);
	const buffer = audioBuffer.getChannelData(0);
	for (let i = 0; i < frameCount; i++) {
	  const t = i / audioContext.sampleRate;
	  buffer[i] = Math.sin(2 * Math.PI * freq  * t);
	}
	return audioBuffer;
  }

  audioContext = null;
  document.body.addEventListener('click', () => {
	// audioAPi
	audioContext = new AudioContext();
	const oscillatorNode = audioContext.createOscillator();
	oscillatorNode.connect(audioContext.destination);
  });

  setInterval(() => {
	if(audioContext) {
		const source = audioContext.createBufferSource();
		source.buffer = createAudioBuffer(dir*(fb+180)*(lr+180), 0.3);
		source.connect(audioContext.destination);
		source.start();
	}
  }, 1000)


  //. devicemotion イベントハンドラ
  function devicemotion( event ){
	//. 通常の処理を無効にする
	event.preventDefault();

	$('#kasokudo_x').val(event.accelerationIncludingGravity.x);
	$('#kasokudo_y').val(event.accelerationIncludingGravity.y);
	$('#kasokudo_z').val(event.accelerationIncludingGravity.z);
  }

  


  /*
 * 起動処理
 */
window.addEventListener("load", function(){
	// キャンバス情報取得
	canvas = document.getElementById("canvas");
	g = canvas.getContext("2d");

	// キャンバスサイズ設定
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;

	// ボールを一つ生成
	ball = new Ball(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 20);

	// メインループ実行
	mainLoop();
});


/*
 * ゲームループ
 */
function mainLoop(){
	// 画面クリア
	g.fillStyle = "#ddd";
	g.fillRect(0, 0, canvas.width, canvas.height);

	// ボールを描く
	ball.draw();

	// 再帰呼び出し
	requestAnimationFrame(mainLoop);
}


/*
 * 定数
 */
const SCREEN_WIDTH = 480;		// キャンバス幅（ピクセル）
const SCREEN_HEIGHT = 480;	// キャンバス高さ（ピクセル）

/*
 * グローバル変数
 */
var canvas = null;		// キャンバス
var g = null;				// コンテキスト
var vec = {x: 0, y: 0 };	// 加速度センサー値格納用
var ball = null;			// 表示するボール

/*
 * ボールクラス
 */
class Ball{
	constructor(x, y, r){
		this.x = x;	// x座標
		this.y = y;	// y座標
		this.r = r;	// 半径
	}
	draw(){
		// 位置を計算
		this.x += vec.x;
		this.y += vec.y;
		// 円を描画（塗りつぶし円）
		g.beginPath();
		g.fillStyle = "orange";
		g.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		g.fill();
	};
};