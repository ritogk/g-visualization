<template>
  <BarChart :chart-data="chartData" />
  <button type="button" class="btn btn-primary" @click="router.push('/abb')">
    ページ遷移dayo</button
  ><br />
  <button type="button" class="btn btn-primary" @click="clickStartGyrosensor">
    ジャイロセンサーを有効にする</button
  ><br />
  <button type="button" class="btn btn-primary" @click="clickStopGyrosensor">
    ジャイロセンサーを無効にする</button
  ><br />
  <!-- 傾きx -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input
          id="inputGyroX"
          v-model="gyro_x"
          type="text"
          class="form-control"
        />
        <label for="inputGyroX">x</label>
      </div>
    </div>
  </div>
  <!-- 傾きy -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input
          id="floatingInputGrid"
          v-model="gyro_y"
          type="email"
          class="form-control"
          placeholder="name@example.com"
        />
        <label for="floatingInputGrid">y</label>
      </div>
    </div>
  </div>
  <!-- 傾きz -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input
          id="floatingInputGrid"
          v-model="gyro_z"
          type="email"
          class="form-control"
          placeholder="name@example.com"
        />
        <label for="floatingInputGrid">z</label>
      </div>
    </div>
  </div>
  <button
    type="button"
    class="btn btn-primary"
    @click="clickStartAccelerationSensor"
  >
    加速度センサーを有効にする</button
  ><br />
  <!-- 傾きx -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input
          id="inputGyroX"
          v-model="acceleration_x"
          type="text"
          class="form-control"
        />
        <label for="inputGyroX">x</label>
      </div>
    </div>
  </div>
  <!-- 傾きy -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input
          id="floatingInputGrid"
          v-model="acceleration_y"
          type="email"
          class="form-control"
          placeholder="name@example.com"
        />
        <label for="floatingInputGrid">y</label>
      </div>
    </div>
  </div>
  <!-- 傾きz -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input
          id="floatingInputGrid"
          v-model="acceleration_z"
          type="email"
          class="form-control"
          placeholder="name@example.com"
        />
        <label for="floatingInputGrid">z</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useGyroSensortKey, useGyroSensortType } from '@/libs/device/gyroSensor'
import {
  useAccelerationSensortKey,
  useAccelerationSensortType,
} from '@/libs/device/accelerationSensor'
import BarChart from '@/components/BarChart'
// import { useDeviceKey, useDeviceType } from '@/libs/device/device'

export default defineComponent({
  components: {
    BarChart,
  },
  setup() {
    const router = useRouter()
    // const useDevice = inject(useDeviceKey) as useDeviceType

    const chartData = reactive({
      labels: ['1', '2', '3', '4', '5', '6', '8'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          borderColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40],
          fill: false,
          tension: 0.2,
        },
        {
          label: 'Data Two',
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd',
          data: [1, 3, 1, 40, 3, 8, 40],
          fill: false,
          tension: 0.2,
        },
        {
          label: 'Data Three',
          backgroundColor: '#20c997',
          borderColor: '#20c997',
          data: [10, 3, 12, 2, 13, 38, 4],
          fill: false,
          tension: 0.2,
        },
        {
          label: 'Data Three',
          backgroundColor: '#ffff00',
          borderColor: '#ffff00',
          data: [70, 23, 23, 2, 13, 38, 4],
          fill: false,
          tension: 0.2,
        },
      ],
    })

    // ジャイロセンサーの値
    const gyro_x = ref(0)
    const gyro_y = ref(0)
    const gyro_z = ref(0)
    // 加速度センサーの値
    const acceleration_x = ref(0)
    const acceleration_y = ref(0)
    const acceleration_z = ref(0)

    // ジャイロセンサーモジュール
    const useGyroSensor = inject(useGyroSensortKey) as useGyroSensortType
    // 「ジャイロセンサーを有効にする」押下
    const clickStartGyrosensor = () => {
      chartData.datasets.push({
        label: 'Data Three',
        backgroundColor: '#20c997',
        borderColor: '#20c997',
        data: [170, 223, 123, 12, 113, 38, 4],
        fill: false,
        tension: 0.2,
      })
      useGyroSensor.enableSensor()
    }
    // 「ジャイロセンサーを無効にする」押下
    const clickStopGyrosensor = () => {
      useGyroSensor.removeEvent(deviceOrientation)
    }
    const deviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha === null || e.beta === null || e.gamma === null) return
      //. スマホの傾きを取得
      // iphoneとandroidで向きが逆なので-1を掛けて任意に修正
      gyro_z.value = e.alpha //. 北極方向に対する向きの角度 z軸 0 - 360
      gyro_x.value = e.beta //. 前後の傾き角度 x軸 -180 - 180
      gyro_y.value = e.gamma //. 左右の傾き角度 y軸 -90 - 90
    }
    useGyroSensor.addEvent(deviceOrientation)

    // 加速度センサーモジュール
    const useAccelerationSensor = inject(
      useAccelerationSensortKey
    ) as useAccelerationSensortType
    // 「加速度センサーを有効にする」押下
    const clickStartAccelerationSensor = () => {
      useAccelerationSensor.enableSensor()
    }
    const deviceAcceleration = (e: DeviceMotionEvent) => {
      if (
        e.accelerationIncludingGravity === null ||
        e.accelerationIncludingGravity.x === null ||
        e.accelerationIncludingGravity.y === null ||
        e.accelerationIncludingGravity.z === null
      )
        return
      //. スマホの傾きを取得
      // iphoneとandroidで向きが逆なので-1を掛けて任意に修正
      acceleration_z.value = e.accelerationIncludingGravity.z
      acceleration_x.value = e.accelerationIncludingGravity.x
      acceleration_y.value = e.accelerationIncludingGravity.y
    }
    useAccelerationSensor.addEvent(deviceAcceleration)

    return {
      clickStartGyrosensor,
      clickStopGyrosensor,
      clickStartAccelerationSensor,
      gyro_x,
      gyro_y,
      gyro_z,
      acceleration_x,
      acceleration_y,
      acceleration_z,
      router,
      chartData,
    }
  },
  computed: {},
})
</script>
