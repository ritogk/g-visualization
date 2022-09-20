<template>
  <FirstTest key="firstTest"></FirstTest>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FirstTest from '@/components/questionnaires/FirstTest.vue'

export default defineComponent({
  components: {
    FirstTest,
  },
  setup() {
    return {}
  },
})
</script>
