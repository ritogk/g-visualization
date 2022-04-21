<template>
  <button type="button" class="btn btn-primary" @click="router.push('/abb')">
    ページ遷移dayo
  </button>
  <button type="button" class="btn btn-primary" @click="clickStartGyrosensor">
    ジャイロセンサーを有効にする
  </button>
  <button type="button" class="btn btn-primary" @click="clickStopGyrosensor">
    ジャイロセンサーを無効にする
  </button>
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
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useGyroSensortKey, useGyroSensortType } from '@/libs/device/gyroSensor'

export default defineComponent({
  setup() {
    const useGyroSensor = inject(useGyroSensortKey) as useGyroSensortType

    // ジャイロセンサーの値
    const gyro_x = ref(0)
    const gyro_y = ref(0)
    const gyro_z = ref(0)
    const router = useRouter()

    // 「ジャイロセンサーを有効にする」押下
    const clickStartGyrosensor = () => {
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
      gyro_z.value = e.alpha * -1 //. 北極方向に対する向きの角度 z軸 0 - 360
      gyro_x.value = e.beta * -1 //. 前後の傾き角度 x軸 -180 - 180
      gyro_y.value = e.gamma * -1 //. 左右の傾き角度 y軸 -90 - 90
    }

    useGyroSensor.addEvent(deviceOrientation)

    return {
      clickStartGyrosensor,
      clickStopGyrosensor,
      gyro_x,
      gyro_y,
      gyro_z,
      router,
    }
  },
})
</script>
