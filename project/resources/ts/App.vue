<template>
  <div class="container">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import { useGyroSensor, useGyroSensortKey } from '@/libs/device/gyro_sensor'

export default defineComponent({
  setup() {
    const gyroSensor = useGyroSensor()
    provide(useGyroSensortKey, gyroSensor)

    return {}
  },
})
</script>
