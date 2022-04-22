<template>
  <button type="button" class="btn btn-primary" @click="router.push('/abb')">
    ページ遷移dayo</button
  ><br />
  <button type="button" class="btn btn-primary" @click="clickDraw">作図</button
  ><br />
  <button
    type="button"
    class="btn btn-primary"
    @click="clickStartAccelerationSensor"
  >
    加速度センサーを有効にする</button
  ><br />
  <!-- <LineChart :chart-data="chartAcceleration" /> -->
  <Canvas
    :x="adjust_g_acceleration_x"
    :y="adjust_g_acceleration_y"
    :draw="draw"
  />

  <!-- G_X -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input
          id="inputGyroX"
          v-model="adjust_g_acceleration_x"
          type="text"
          class="form-control"
        />
        <label for="inputGyroX">x</label>
      </div>
    </div>
  </div>
  <!-- G_Y -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input
          id="floatingInputGrid"
          v-model="adjust_g_acceleration_y"
          type="email"
          class="form-control"
          placeholder="name@example.com"
        />
        <label for="floatingInputGrid">y</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  useAccelerationSensortKey,
  useAccelerationSensortType,
} from '@/libs/device/accelerationSensor'

import Canvas from '@/components/Canvas.vue'
//import LineChart from '@/components/chart/LineChart'
import { max_g } from '@/libs/constants'
// import { useDeviceKey, useDeviceType } from '@/libs/device/device'

export default defineComponent({
  components: {
    Canvas,
    //LineChart,
  },
  setup() {
    const router = useRouter()
    // const useDevice = inject(useDeviceKey) as useDeviceType

    const draw = ref(false)
    const adjust_g_acceleration_x = ref(0)
    const adjust_g_acceleration_y = ref(0)

    const adjust_g_acceleration_x_log = [] as number[]
    const adjust_g_acceleration_y_log = [] as number[]

    // 加速度センサーのチャートデータ
    const chartAcceleration = reactive({
      labels: [] as string[],
      datasets: [
        {
          label: 'x',
          backgroundColor: '#f87979',
          borderColor: '#f87979',
          data: [] as number[],
          fill: false,
          tension: 0.2,
        },
        {
          label: 'y',
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd',
          data: [] as number[],
          fill: false,
          tension: 0.2,
        },
      ],
    })

    // 加速度センサーの調整値
    let calibration_acceleration_x = 0
    let calibration_acceleration_y = 0

    // 加速度センサーモジュール
    const useAccelerationSensor = inject(
      useAccelerationSensortKey
    ) as useAccelerationSensortType

    // 「加速度センサーを有効にする」押下
    const clickStartAccelerationSensor = () => {
      useAccelerationSensor.enableSensor()
    }
    // 「作図」押下
    const clickDraw = () => {
      // LineChart
      chartAcceleration.labels = [
        ...Array(adjust_g_acceleration_x_log.length),
      ].map(() => '')
      chartAcceleration.datasets[0].data = adjust_g_acceleration_x_log
      chartAcceleration.datasets[1].data = adjust_g_acceleration_y_log

      draw.value = true
    }

    const deviceAcceleration = (e: DeviceMotionEvent) => {
      // 加速度センサーが有効になっているか？
      if (!useAccelerationSensor.stateRefs.isEnable.value) return
      if (
        e.acceleration === null ||
        e.acceleration.x === null ||
        e.acceleration.y === null ||
        e.acceleration.z === null
      )
        return

      // 加速度のキャリブレーション
      if (
        calibration_acceleration_x === 0 &&
        calibration_acceleration_y === 0
      ) {
        calibration_acceleration_x = e.acceleration.x * -1
        calibration_acceleration_y = e.acceleration.y * -1
      }
      // 加速度をGに変換
      const g_x = (e.acceleration.x + calibration_acceleration_x) / 9.8
      const g_y = (e.acceleration.y + calibration_acceleration_y) / 9.8

      // Gを1.1~-1.1に収まるように調整を行う
      adjust_g_acceleration_x.value =
        g_x > 0 ? (g_x > max_g ? max_g : g_x) : g_x < -max_g ? -max_g : g_x
      adjust_g_acceleration_y.value =
        g_y > 0 ? (g_y > max_g ? max_g : g_y) : g_y < -max_g ? -max_g : g_y

      // adjust_g_acceleration_x_log.push(adjust_g_acceleration_x.value)
      // adjust_g_acceleration_y_log.push(adjust_g_acceleration_y.value)
    }
    useAccelerationSensor.addEvent(deviceAcceleration)

    return {
      clickDraw,
      clickStartAccelerationSensor,
      router,
      draw,
      adjust_g_acceleration_x,
      adjust_g_acceleration_y,
      chartAcceleration,
    }
  },
  computed: {},
})
</script>
