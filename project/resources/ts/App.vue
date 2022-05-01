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

export default defineComponent({
  setup() {
    // 端末
    const device = useDevice()
    provide(useDeviceKey, device)
    device.setDevice()
    if (device.stateRefs.device.value === Device.pc) {
      //alert('このページはスマートフォン専用サイトです。')
    }

    // ジャイロセンサー
    const gyroSensor = useGyroSensor()
    provide(useGyroSensortKey, gyroSensor)

    // 加速度センサー
    const accelerationSensor = useAccelerationSensor()
    provide(useAccelerationSensortKey, accelerationSensor)

    return {}
  },
})
</script>
