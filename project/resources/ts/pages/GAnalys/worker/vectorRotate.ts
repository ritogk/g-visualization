/**
 * 三次元ベクトルの回転処理
 * ※worker用
 */

import { rotate3dVector } from '@/pages/GAnalys/services/trigonometric'

const w: Worker = self as any

w.onmessage = (event: MessageEvent) => {
  const data: any = event.data
  const rotate_acceration = rotate3dVector(
    data.x,
    data.y,
    data.z,
    data.angle_x,
    data.angle_y,
    data.angle_z
  )
  w.postMessage(rotate_acceration)
}

export default w
