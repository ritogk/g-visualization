<template>
  <div>
    <Canvas :position-x="20" , :position-y="40" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Canvas from '@/components/Canvas.vue'
export default defineComponent({
  components: {
    Canvas,
  },
  setup() {
    const message = ref<string>('Abb')
    return {
      message,
    }
  },
})
</script>
