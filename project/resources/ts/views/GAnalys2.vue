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

    <GIndicator :x="rotate_g_x" :y="rotate_g_y" :draw="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, watch } from 'vue'
import {
  useAccelerationSensortKey,
  useAccelerationSensortType,
} from '@/libs/device/accelerationSensor'
import { useGyroSensortKey, useGyroSensortType } from '@/libs/device/gyroSensor'
import { rotate3dVector } from '@/libs/trigonometric'
import GIndicator from '@/components/GIndicator.vue'

export default defineComponent({
  components: {
    GIndicator,
  },
  setup() {
    // ジャイロセンサーのモジュール
    const useGyroSensor = inject(useGyroSensortKey) as useGyroSensortType
    // ジャイロセンサーから取得できるリアルタイムな値
    const gyro_x = useGyroSensor.stateRefs.x
    const gyro_y = useGyroSensor.stateRefs.y
    const gyro_z = useGyroSensor.stateRefs.z
    let before_gyro_x = 0
    let before_gyro_y = 0
    let before_gyro_z = 0
    let after_gyro_x = 0
    let after_gyro_y = 0
    let after_gyro_z = 0

    // 加速度センサーのモジュール
    const useAccelerationSensor = inject(
      useAccelerationSensortKey
    ) as useAccelerationSensortType
    // 加速度から取得したリアルタイムな値
    const g_x = useAccelerationSensor.stateRefs.gX
    const g_y = useAccelerationSensor.stateRefs.gY
    const g_z = useAccelerationSensor.stateRefs.gZ
    // 回転したG
    const rotate_g_x = ref(0)
    const rotate_g_y = ref(0)
    // スマホで検出したGを車のGに変換する
    watch([g_x, g_y, g_z], () => {
      const angle_x = after_gyro_x - before_gyro_x
      const angle_y = after_gyro_y - before_gyro_y
      const angle_z = Math.abs(before_gyro_z - after_gyro_z)
      let rotate_acceration = null
      rotate_acceration = rotate3dVector(
        g_x.value,
        g_y.value,
        g_z.value,
        angle_x,
        angle_y,
        angle_z
      )

      rotate_g_x.value = rotate_acceration.x
      rotate_g_y.value = rotate_acceration.y
    })

    // 画面の制御フラグ
    const isEnabledSensor = useAccelerationSensor.stateRefs.isEnable
    const isCalibrated1 = ref(false)
    const isCalibrated2 = ref(false)
    const isDriving = ref(false)

    // 車の加速度を計測する際の角度を計測する
    const cickCalibration1 = () => {
      before_gyro_x = gyro_x.value
      before_gyro_y = gyro_y.value
      before_gyro_z = gyro_z.value
      isCalibrated1.value = true
      alert(
        'キャリブレーション1が完了しました。\nスマホをスタンドに固定し終えたら「キャリブレーション2」を押して下さい。'
      )
    }

    // スマホを固定しときの角度を記憶する
    const cickCalibration2 = () => {
      after_gyro_x = gyro_x.value
      after_gyro_y = gyro_y.value
      after_gyro_z = gyro_z.value
      isCalibrated2.value = true
      alert(
        'キャリブレーション2が完了しました。\n 「ドライビングスタート」を押して下さい。'
      )
    }

    // 「センサーを有効」押下
    const clickStartSensor = () => {
      // 加速度センサーの有効化
      useAccelerationSensor.enableSensor()
      // ジャイロセンサーの有効化
      useGyroSensor.enableSensor()
      alert(
        'センサーを有効にしました。\nスマホと地面が並行になるようにした状態で「キャリブレーション1」を押して下さい。'
      )
    }

    // 「ドライビングスタート」押下
    const clickDrivingStart = () => {
      isDriving.value = true
    }

    return {
      rotate_g_x,
      rotate_g_y,
      cickCalibration1,
      cickCalibration2,
      clickDrivingStart,
      clickStartSensor,
      isEnabledSensor,
      isCalibrated1,
      isCalibrated2,
      isDriving,
    }
  },
  computed: {},
})
</script>
