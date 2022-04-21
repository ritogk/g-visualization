<template>
  <div>
    {{ message }}
    aaaaa
    <GAnalys />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GAnalys from '@/components/GAnalys.vue'
export default defineComponent({
  components: {
    GAnalys,
  },
  setup() {
    const message = ref<string>('Abb')
    return {
      message,
    }
  },
})
</script>
