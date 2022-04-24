/**
 * 三角関数に関するモジュール
 */

/**
 * 2つの座標から角度を求める
 * @param a
 * @param b
 * @returns
 */
interface Point {
  x: number
  y: number
}

/**
 * 指定された x-y 座標のアークタンジェントを返します。
 * アークタンジェントとは、x 軸から、原点 0 と x 座標、y 座標で表される点を結んだ直線までの角度のことです。
 * http://www.sourcenext.com/manual/pc_ofc_001233/Calc/function/mathematics/atan2.htm
 * @param
 * @return θ
 *
 */
function pointToAtan2(p: Point) {
  const atan2 = Math.atan2(p.x, p.y)
  // 戻り値が正の数なら x 軸から反時計回りの角度を表し、負の数なら x 軸から時計回りの角度を表します。
  if (atan2 < 0) {
    return 360 + thetaToAngled(atan2)
  } else {
    return thetaToAngled(atan2)
  }
}

/**
 * θを角度に変換します、
 * @param θ
 * @param 角度
 */
function thetaToAngled(theta: number) {
  return theta / (Math.PI / 180)
}

export { pointToAtan2, thetaToAngled }
