<template>
  <div class="container">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import { useGyroSensor, useGyroSensortKey } from '@/libs/device/gyroSensor'
import { useDevice, useDeviceKey } from '@/libs/device/device'

import { Device } from '@/libs/constants'

export default defineComponent({
  setup() {
    // 端末
    const device = useDevice()
    provide(useDeviceKey, device)
    device.setDevice()
    if (device.stateRefs.device.value === Device.pc) {
      alert('このページはスマートフォン専用サイトです。')
    }

    // ジャイロセンサー
    const gyroSensor = useGyroSensor()
    provide(useGyroSensortKey, gyroSensor)

    return {}
  },
})
</script>
