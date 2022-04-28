;(function (d) {
  //canvas要素を取得
  const el = d.querySelector('.clock')

  //コンテキストを取得
  const ctx = el.getContext('2d')

  activateClock(ctx)

  //時計を描画
  function activateClock(ctx, time) {
    //背景の円を描画
    ctx.beginPath()
    ctx.arc(150, 150, 115, 0, 2 * Math.PI) //円のパスを設定　・・・補足１
    ctx.fill() //円のパスを塗りつぶす

    //目盛を描画　・・・補足２
    for (let i = 0; i < 60; i++) {
      debugger
      let r = ((6 * Math.PI) / 180) * i
      const w = i % 5 === 0 ? 4 : 1
      _setCtxStyle(ctx, 'black', 'white', w)
      _drawCtx(ctx, r, 100, 4)
    }
  }

  //コンテキストの描画スタイルを設定する関数
  function _setCtxStyle(ctx, fillColor, strokeColor, lineWidth) {
    ctx.fillStyle = fillColor
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'
  }

  //線を描画する関数 ・・・補足４
  function _drawCtx(ctx, rotation, moveToY = 0, length) {
    ctx.save()
    ctx.translate(150, 150)
    ctx.rotate(rotation)
    ctx.beginPath()
    ctx.moveTo(0, moveToY)
    ctx.lineTo(0, moveToY + length)
    ctx.stroke()
    ctx.restore()
  }
})(document)
