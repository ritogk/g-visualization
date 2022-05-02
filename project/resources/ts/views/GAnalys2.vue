<template>
  <div>
    <button
      :disabled="isEnabledSensor"
      type="button"
      class="btn btn-success w-100"
      @click="clickStartSensor()"
    >
      ①センサーを有効にする</button
    ><br />
    <button
      :disabled="!isEnabledSensor || isCalibrated1"
      type="button"
      class="btn btn-primary w-100"
      @click="cickCalibration1()"
    >
      ②キャリブレーション1
    </button>
    <br />
    <button
      :disabled="!isCalibrated1 || isCalibrated2"
      type="button"
      class="btn btn-primary w-100"
      @click="cickCalibration2()"
    >
      ③キャリブレーション2
    </button>
    <button
      type="button"
      class="btn btn-success"
      hidden
      @click="clickNamSensor"
    >
      3次元ベクトルの回転を行わない
    </button>
    <button
      type="button"
      class="btn btn-light w-100"
      :disabled="!isCalibrated2"
      :class="{
        'bg-danger': isDriving,
      }"
      @click="clickDrivingStart"
    >
      ④ドライビングスタート</button
    ><br />

    <GBar :x="adjust_rotate_g_x" :y="adjust_rotate_g_y" :draw="draw" />
  </div>
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

    const isEnabledSensor = ref(false)
    const isCalibrated1 = ref(false)
    const isCalibrated2 = ref(false)
    const isDriving = ref(false)

    const isNama = ref(false)

    // 車の加速度を計測する際の角度を計測する
    const cickCalibration1 = () => {
      before_x = gyro_x.value
      before_y = gyro_y.value
      before_z = gyro_z.value
      isCalibrated1.value = true
      // alert(
      //   `angle(角度) \n
      //   x: ${before_x} y:${before_y} z:${before_z} \n
      //   `
      // )
      alert(
        'キャリブレーション1が完了しました。\nスマホをスタンドに固定し終えたら「キャリブレーション2」を押して下さい。'
      )
    }

    // スマホを固定しときの角度を記憶する
    const cickCalibration2 = () => {
      after_x = gyro_x.value
      after_y = gyro_y.value
      after_z = gyro_z.value
      isCalibrated2.value = true
      // alert(
      //   `angle(角度) \n
      //   before x: ${before_x} y:${before_y} z:${before_z} \n
      //   after x: ${after_x} y:${after_y} z:${after_z} \n
      //   `
      // )
      alert(
        'キャリブレーション2が完了しました。\n 「ドライビングスタート」を押して下さい。'
      )
    }

    // 「センサーを有効」押下
    const clickStartSensor = () => {
      // 加速度センサーの有効化
      useAccelerationSensor.addEvent(deviceAcceleration)
      useAccelerationSensor.enableSensor()
      // ジャイロセンサーの有効化
      useGyroSensor.addEvent(deviceGyro)
      useGyroSensor.enableSensor()
      isEnabledSensor.value = true
      alert(
        'センサーを有効にしました。\nスマホと地面が並行になるようにした状態で「キャリブレーション1」を押して下さい。'
      )
    }

    // 「ドライビングスタート」押下
    const clickDrivingStart = () => {
      draw.value = true
      isDriving.value = true
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
      const acceleration = e.accelerationIncludingGravity
      if (acceleration === null) return

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
        rotate_acceration = rotate3dVector(
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

      // console.log(before_rotate_g_x)
      // console.log(before_rotate_g_y)
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
      clickDrivingStart,
      clickStartSensor,
      cickCalibration1,
      cickCalibration2,
      clickDef,
      router,
      draw,
      adjust_g_x,
      adjust_g_y,
      angle_g_xy,
      gyro_z,
      gyro_y,
      gyro_x,
      gyro_result,
      rotate_acceleration_x,
      rotate_acceleration_y,
      rotate_acceleration_z,
      adjust_rotate_g_x,
      adjust_rotate_g_y,
      isEnabledSensor,
      isCalibrated1,
      isCalibrated2,
      isDriving,
      isNama,
    }
  },
  computed: {},
})
</script>
