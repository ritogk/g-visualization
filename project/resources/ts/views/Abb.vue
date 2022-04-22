<template>
  <div>
    <GBowl :position-x="20" , :position-y="40" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GBowl from '@/components/GBowl.vue'
export default defineComponent({
  components: {
    GBowl,
  },
  setup() {
    const message = ref<string>('Abb')
    return {
      message,
    }
  },
})
</script>
