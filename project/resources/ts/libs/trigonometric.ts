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

/**
 * 3次元ベクトルの回転を行う。
 *
 * @param number $vector_x
 * @param number $vector_y
 * @param number $vector_z
 * @param number $angle_x
 * @param number $angle_y
 * @param number $angle_z
 * @return {x:number, y:number, z:number}
 */
const rotate3dVector = (
  vector_x: number,
  vector_y: number,
  vector_z: number,
  angle_x: number,
  angle_y: number,
  angle_z: number
): { x: number; y: number; z: number } => {
  // ３次元回転行列の公式が右回りなのでマイナス角度の場合は変換処理を挟む。
  // z軸は0-360度なので変換は不要。
  if (angle_x < 0) {
    angle_x = 360 + angle_x
  }
  if (angle_y < 0) {
    angle_y = 360 + angle_y
  }

  // 角度→ラジアンに変換
  const razian_x = angle_x * (Math.PI / 180)
  const razian_y = angle_y * (Math.PI / 180)
  const razian_z = angle_z * (Math.PI / 180)

  // x軸周りに右回転した座標を取得する表現行列
  const matrix_x = [
    [1, 0, 0],
    [0, Math.cos(razian_x), -Math.sin(razian_x)],
    [0, Math.sin(razian_x), Math.cos(razian_x)],
  ]

  // // y軸周り右回転した座標を取得する表現行列
  const matrix_y = [
    [Math.cos(razian_y), 0, Math.sin(razian_y)],
    [0, 1, 0],
    [-Math.sin(razian_y), 0, Math.cos(razian_y)],
  ]

  // z軸周りに右回転した座標を取得する表現行列
  const matrix_z = [
    [Math.cos(razian_z), -Math.sin(razian_z), 0],
    [Math.sin(razian_z), Math.cos(razian_z), 0],
    [0, 0, 1],
  ]

  /**
   * 回転行列を使ってベクトルの回転を行う。
   *
   * @param number[][] matrix
   * @param number[] vector
   * @return {x:number, y:number, z:number}
   */
  const calc = (
    matrix: number[][],
    vector: number[]
  ): { x: number; y: number; z: number } => {
    return {
      x:
        matrix[0][0] * vector[0] +
        matrix[0][1] * vector[1] +
        matrix[0][2] * vector[2],
      y:
        matrix[1][0] * vector[0] +
        matrix[1][1] * vector[1] +
        matrix[1][2] * vector[2],
      z:
        matrix[2][0] * vector[0] +
        matrix[2][1] * vector[1] +
        matrix[2][2] * vector[2],
    }
  }

  // x軸回りの回転
  let rotational_vector = calc(matrix_x, [vector_x, vector_y, vector_z])
  // y軸回りの回転
  rotational_vector = calc(matrix_y, [
    rotational_vector.x,
    rotational_vector.y,
    rotational_vector.z,
  ])
  // z軸回りの回転
  rotational_vector = calc(matrix_z, [
    rotational_vector.x,
    rotational_vector.y,
    rotational_vector.z,
  ])

  return {
    x: rotational_vector.x,
    y: rotational_vector.y,
    z: rotational_vector.z,
  }
}
export { pointToAtan2, thetaToAngled, rotate3dVector }
