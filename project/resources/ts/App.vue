<template>
  <div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
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
    // 端末
    const device = useDevice()
    provide(useDeviceKey, device)

    // 端末がスマホ出ない場合は警告文を表示
    device.setDevice()
    if (device.stateRefs.device.value === Device.pc) {
      alert('このアプリはスマホ専用です。')
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

    return {}
  },
})
</script>
