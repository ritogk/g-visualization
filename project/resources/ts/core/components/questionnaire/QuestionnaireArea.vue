<!-- アンケートを管理する親コンポーネント-->
<template>
  <FirstTest key="firstTest"></FirstTest>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FirstTest from '@/core/components/questionnaire/parts/FirstTest.vue'

export default defineComponent({
  components: {
    FirstTest,
  },
  setup() {
    return {}
  },
})
</script>
