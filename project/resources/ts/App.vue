<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click="clickHeader">GVisual</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavDropdown" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" @click="clickGBowl">GBowl</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="clickGIndicator">GIndicator</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import { useRouter } from 'vue-router'
import { useDevice, useDeviceKey } from '@/libs/device/device'
import { useGyroSensor, useGyroSensortKey } from '@/libs/device/gyroSensor'
import {
  useAccelerationSensor,
  useAccelerationSensortKey,
} from '@/libs/device/accelerationSensor'
import { Device } from '@/libs/constants'
import NoSleep from 'nosleep.js'

export default defineComponent({
  setup() {
    // 端末情報
    const device = useDevice()
    provide(useDeviceKey, device)

    // 端末がiphoneでない場合は警告文を表示
    device.setDevice()
    if (device.stateRefs.device.value !== Device.ios) {
      alert('このアプリはios専用です。')
    }

    // ジャイロセンサー
    const gyroSensor = useGyroSensor()
    provide(useGyroSensortKey, gyroSensor)

    // 加速度センサー
    const accelerationSensor = useAccelerationSensor()
    provide(useAccelerationSensortKey, accelerationSensor)

    // スリープを防ぐ
    var noSleep = new NoSleep()
    window.addEventListener(
      'click',
      function enableNoSleep() {
        document.removeEventListener('click', enableNoSleep, false)
        noSleep.enable()
      },
      false
    )

    const router = useRouter()
    // 「GBowl」クリックイベント
    const clickGBowl = () => {
      router.push({ name: 'GAnalays1' })
    }

    // 「GIndicator」クリックイベント
    const clickGIndicator = () => {
      router.push({ name: 'GAnalays2' })
    }

    // 「ヘッダー」クリックイベント
    const clickHeader = () => {
      router.push({ name: 'index' })
    }

    return { clickGBowl, clickGIndicator, clickHeader }
  },
})
</script>
