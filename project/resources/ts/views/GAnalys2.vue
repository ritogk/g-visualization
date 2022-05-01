<template>
  <button type="button" class="btn btn-success" @click="clickStartSensor">
    センサーを有効にする</button
  ><br />
  <button type="button" class="btn btn-primary" @click="cickCalibration1()">
    キャリブレーション1
  </button>
  <span v-if="isCalibrated1">完了</span>
  <br />
  <button type="button" class="btn btn-primary" @click="cickCalibration2()">
    キャリブレーション2
  </button>
  <span v-if="isCalibrated2">完了</span>
  <br />
  <button type="button" class="btn btn-success" @click="clickNamSensor">
    3次元ベクトルの回転を行わない
  </button>
  <span v-show="isNama"> YES</span>
  <span v-show="!isNama"> NO</span><br />
  <button type="button" class="btn btn-primary" @click="clickDraw">開始</button
  ><br />

  <GBar :x="adjust_rotate_g_x" :y="adjust_rotate_g_y" :draw="draw" />
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import {
  useAccelerationSensortKey,
  useAccelerationSensortType,
} from '@/libs/device/accelerationSensor'

import { useGyroSensortKey, useGyroSensortType } from '@/libs/device/gyroSensor'

import { pointToAtan2 } from '@/libs/trigonometric'

import GBar from '@/components/GBar.vue'

import { BigNumber } from 'bignumber.js'

export default defineComponent({
  components: {
    GBar,
  },
  setup() {
    const router = useRouter()

    // ジャイロセンサーのモジュール
    const useGyroSensor = inject(useGyroSensortKey) as useGyroSensortType

    // 加速度センサーのモジュール
    const useAccelerationSensor = inject(
      useAccelerationSensortKey
    ) as useAccelerationSensortType

    // BigNumberの初期設定
    BigNumber.config({
      DECIMAL_PLACES: 4, // 小数部2桁
      ROUNDING_MODE: BigNumber.ROUND_DOWN, // 切り上げ})
    })

    const adjust_g_x = ref(0)
    const adjust_g_y = ref(0)
    let before_g_x = 0
    let before_g_y = 0
    let angle_g_xy = 0

    const gyro_x = ref(0)
    const gyro_y = ref(0)
    const gyro_z = ref(0)

    let before_x = 0
    let before_y = 0
    let before_z = 0
    let after_x = 0
    let after_y = 0
    let after_z = 0

    const isCalibrated1 = ref(false)
    const isCalibrated2 = ref(false)

    const isNama = ref(false)

    // 車の加速度を計測する際の角度を計測する
    const cickCalibration1 = () => {
      before_x = gyro_x.value
      before_y = gyro_y.value
      before_z = gyro_z.value
      isCalibrated1.value = true
      alert(
        `angle(角度) \n
        x: ${before_x} y:${before_y} z:${before_z} \n
        `
      )
    }

    // スマホを固定しときの角度を記憶する
    const cickCalibration2 = () => {
      after_x = gyro_x.value
      after_y = gyro_y.value
      after_z = gyro_z.value
      isCalibrated2.value = true
      alert(
        `angle(角度) \n
        before x: ${before_x} y:${before_y} z:${before_z} \n
        before x: ${after_x} y:${after_y} z:${after_z} \n
        `
      )
    }

    const gyro_result = () => {
      alert(
        `x:${gyro_x.value - before_x} y:${gyro_y.value - before_y} z:${
          gyro_z.value - before_z
        }`
      )
    }
    // gサークルを描画するかどうかのフラグ
    const draw = ref(false)

    let before_rotate_g_x = 0
    let before_rotate_g_y = 0
    const adjust_rotate_g_x = ref(0)
    const adjust_rotate_g_y = ref(0)
    // 回転後の加速度の値
    const rotate_acceleration_x = ref(0)
    const rotate_acceleration_y = ref(0)
    const rotate_acceleration_z = ref(0)

    // 加速度センサーから値が取得できた時に呼ばれるイベント処理
    const deviceAcceleration = (e: DeviceMotionEvent) => {
      // 加速度センサーが有効になっているかどうかのチェック
      if (!useAccelerationSensor.stateRefs.isEnable.value) return
      // 加速度取得
      const acceleration = e.acceleration
      if (acceleration === null) return

      // const startTime = Date.now()
      const e_acceleration_x = acceleration.x ?? 0
      const e_acceleration_y = acceleration.y ?? 0
      const e_acceleration_z = acceleration.z ?? 0

      // 加速度をGに変換
      const g_x = e_acceleration_x / 9.8
      const g_y = e_acceleration_y / 9.8

      // ローパスフィルタでのノイズ削除
      adjust_g_x.value = useAccelerationSensor.filter(before_g_x, g_x).LPF()
      adjust_g_y.value = useAccelerationSensor.filter(before_g_y, g_y).LPF()
      before_g_x = g_x
      before_g_y = g_y

      // Gの角度を算出
      angle_g_xy = pointToAtan2({ x: g_x, y: g_y }) + 3

      // 回転
      const angle_x = after_x - before_x
      const angle_y = after_y - before_y
      const angle_z = Math.abs(before_z - after_z)
      let rotate_acceration = null
      if (!isNama.value) {
        rotate_acceration = rotate(
          e_acceleration_x,
          e_acceleration_y,
          e_acceleration_z,
          angle_x,
          angle_y,
          angle_z
        )
      } else {
        rotate_acceration = {
          x: e_acceleration_x,
          y: e_acceleration_y,
          z: e_acceleration_z,
        }
      }

      // 速度をGに変換
      const rotate_g_x = rotate_acceration.x / 9.8
      const rotate_g_y = rotate_acceration.y / 9.8

      // ローパスフィルタでのノイズ削除
      adjust_rotate_g_x.value = useAccelerationSensor
        .filter(before_rotate_g_x, rotate_g_x)
        .LPF()
      adjust_rotate_g_y.value = useAccelerationSensor
        .filter(before_rotate_g_y, rotate_g_y)
        .LPF()
      before_rotate_g_x = rotate_g_x
      before_rotate_g_y = rotate_g_y

      rotate_acceleration_x.value = rotate_acceration.x
      rotate_acceleration_y.value = rotate_acceration.y
      rotate_acceleration_z.value = rotate_acceration.z

      console.log(before_rotate_g_x)
      console.log(before_rotate_g_y)

      // const endTime = Date.now() // 終了時間

      // if (before_x != 0 && after_x != 0) {
      //   alert(endTime - startTime) // 何ミリ秒かかったかを表示する
      // }
    }

    // ジャイロセンサーから値が取得できた時に呼ばれるイベント処理
    const deviceGyro = (e: DeviceOrientationEvent) => {
      // ジャイロセンサーが有効になっているかどうかのチェック
      if (!useGyroSensor.stateRefs.isEnable.value) return
      if (e.alpha === null || e.beta === null || e.gamma === null) return

      gyro_z.value = e.alpha
      gyro_y.value = e.gamma
      gyro_x.value = e.beta

      if (before_x == 0 && before_y == 0 && before_z == 0) {
        before_x = gyro_x.value
        before_y = gyro_y.value
        before_z = gyro_z.value
      }
    }

    // スマホセンサーの加速度を車体に合わせて回転させる
    const rotate = (
      acceleration_x: number,
      acceleration_y: number,
      acceleration_z: number,
      angle_x: number,
      angle_y: number,
      angle_z: number
    ) => {
      // ３次元回転行列の公式が右回りなのでマイナス角度の場合は変換処理を挟む。
      // z軸は0-360度なので変換は不要。
      if (angle_x < 0) {
        angle_x = 360 + angle_x
      }
      if (angle_y < 0) {
        angle_y = 360 + angle_y
      }
      /**
       * 3次元ベクトルを回転させる。
       */
      const rotate = (
        v: number[][],
        b: number[]
      ): {
        x: number
        y: number
        z: number
      } => {
        return {
          x:
            new BigNumber(v[0][0]).times(b[0]).toNumber() +
            new BigNumber(v[0][1]).times(b[1]).toNumber() +
            new BigNumber(v[0][2]).times(b[2]).toNumber(),
          y:
            new BigNumber(v[1][0]).times(b[0]).toNumber() +
            new BigNumber(v[1][1]).times(b[1]).toNumber() +
            new BigNumber(v[1][2]).times(b[2]).toNumber(),
          z:
            new BigNumber(v[2][0]).times(b[0]).toNumber() +
            new BigNumber(v[2][1]).times(b[1]).toNumber() +
            new BigNumber(v[2][2]).times(b[2]).toNumber(),
        }
      }

      // 回転させる対象の座標
      const point = {
        x: acceleration_x,
        y: acceleration_y,
        z: acceleration_z,
      }

      // 回転方向(度)
      // const rotate_x = (gyro_x.value - before_x) * -1
      // const rotate_y = (gyro_y.value - before_y) * -1
      // const rotate_z = (gyro_z.value - before_z) * -1

      // 角度→ラジアンに変換
      const razian_x = new BigNumber(angle_x)
        .times(new BigNumber(Math.PI).div(180))
        .toNumber()
      const razian_y = new BigNumber(angle_y)
        .times(new BigNumber(Math.PI).div(180).toNumber())
        .toNumber()
      const razian_z = new BigNumber(angle_z)
        .times(new BigNumber(Math.PI).div(180).toNumber())
        .toNumber()

      // x軸周りにθ回転した座標を取得する表現行列
      const matrix_x = [
        [1, 0, 0],
        [0, Math.cos(razian_x), -Math.sin(razian_x)],
        [0, Math.sin(razian_x), Math.cos(razian_x)],
      ]

      // // y軸周りにθ回転した座標を取得する表現行列
      const matrix_y = [
        [Math.cos(razian_y), 0, Math.sin(razian_y)],
        [0, 1, 0],
        [-Math.sin(razian_y), 0, Math.cos(razian_y)],
      ]

      // z軸周りにθ回転した座標を取得する表現行列
      const matrix_z = [
        [Math.cos(razian_z), -Math.sin(razian_z), 0],
        [Math.sin(razian_z), Math.cos(razian_z), 0],
        [0, 0, 1],
      ]

      // // x軸の回転
      let result = rotate(matrix_x, [point.x, point.y, point.z])
      // y軸の回転
      result = rotate(matrix_y, [result.x, result.y, result.z])
      // // z軸の回転
      result = rotate(matrix_z, [result.x, result.y, result.z])

      // alert(
      //   `angle(角度) \n
      //   x: ${angle_x} y:${angle_y} z:${angle_z} \n
      //   before \n
      //   x:${point.x} y:${point.y} z:${point.z} \n
      //   after \n
      //   x:${result.x} y:${result.y} z:${result.z}
      //   `
      // )

      return { x: result.x, y: result.y, z: result.z }
    }

    // 「センサーを有効」押下
    const clickStartSensor = () => {
      // 加速度センサーの有効化
      useAccelerationSensor.addEvent(deviceAcceleration)
      useAccelerationSensor.enableSensor()
      // ジャイロセンサーの有効化
      useGyroSensor.addEvent(deviceGyro)
      useGyroSensor.enableSensor()
    }

    // 「作図」押下
    const clickDraw = () => {
      draw.value = true
    }

    const clickDef = () => {
      alert(`x before:${before_x} after:${after_x}
            y before:${before_y} after:${after_y}
            z before:${before_z} after:${after_z}
      `)
    }

    const clickNamSensor = () => {
      isNama.value = !isNama.value
    }

    return {
      clickNamSensor,
      clickDraw,
      clickStartSensor,
      router,
      draw,
      adjust_g_x,
      adjust_g_y,
      angle_g_xy,
      gyro_z,
      gyro_y,
      gyro_x,
      cickCalibration1,
      cickCalibration2,
      gyro_result,
      rotate_acceleration_x,
      rotate_acceleration_y,
      rotate_acceleration_z,
      adjust_rotate_g_x,
      adjust_rotate_g_y,
      clickDef,
      isCalibrated1,
      isCalibrated2,
      isNama,
    }
  },
  computed: {},
})
</script>
