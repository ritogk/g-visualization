<template>
  <div class="d-flex flex-row">
    <div class="w-50">
      <p class="text-center">←(G)→</p>
      <div
        v-for="item in g_x_bar.items"
        :key="item"
        class="d-flex align-items-center justify-content-center bar-style border border-secondary"
        :class="{
          'bar-gray': !item.show,
          'bar-red': item.show && item.color == Indicator.red,
          'bar-orange': item.show && item.color == Indicator.orange,
          'bar-green': item.show && item.color == Indicator.green,
          'bar-yellow': item.show && item.color == Indicator.yellow,
        }"
      >
        {{ item.value.toFixed(1) }} G
      </div>
    </div>
    <div class="w-50">
      <p class="text-center">↑(G)↓</p>
      <div
        v-for="item in g_y_bar.items"
        :key="item"
        class="d-flex align-items-center justify-content-center bar-style border border-secondary"
        :class="{
          'bar-gray': !item.show,
          'bar-red': item.show && item.color == Indicator.red,
          'bar-orange': item.show && item.color == Indicator.orange,
          'bar-green': item.show && item.color == Indicator.green,
          'bar-yellow': item.show && item.color == Indicator.yellow,
        }"
      >
        {{ item.value.toFixed(1) }} G
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, toRefs } from 'vue'
import { max_g } from '@/libs/constants'

export default defineComponent({
  props: {
    draw: {
      type: Boolean,
      required: true,
    },
    x: {
      type: Number,
      required: false,
      default: 187,
    },
    y: {
      type: Number,
      required: false,
      default: 187,
    },
  },
  setup(props) {
    enum Indicator {
      yellow = 'yellow',
      green = 'green',
      orange = 'orange',
      red = 'red',
    }
    const bar_max_count = max_g * 10
    // g(x)バーの状態
    const g_x_bar = reactive({
      items: [
        { value: 1.4, show: false, color: Indicator.red },
        { value: 1.3, show: false, color: Indicator.red },
        { value: 1.2, show: false, color: Indicator.red },
        { value: 1.1, show: false, color: Indicator.orange },
        { value: 1.0, show: false, color: Indicator.orange },
        { value: 0.9, show: false, color: Indicator.orange },
        { value: 0.8, show: false, color: Indicator.orange },
        { value: 0.7, show: false, color: Indicator.green },
        { value: 0.6, show: false, color: Indicator.green },
        { value: 0.5, show: false, color: Indicator.green },
        { value: 0.4, show: false, color: Indicator.green },
        { value: 0.3, show: false, color: Indicator.yellow },
        { value: 0.2, show: false, color: Indicator.yellow },
        { value: 0.1, show: false, color: Indicator.yellow },
      ],
      isMinus: false,
    })

    const { x } = toRefs(props)
    watch(x, () => {
      // マイナス、プラスの判定
      g_x_bar.isMinus = props.x > 0
      // 少数点第1までの絶対値を取得
      const abs_g_x = Math.trunc(Math.abs(props.x) * 10) / 10
      for (let i = 0; i < g_x_bar.items.length; i++) {
        g_x_bar.items[i].show = g_x_bar.items[i].value < abs_g_x
      }
    })

    // g(y)バーの状態
    const g_y_bar = reactive({
      items: [
        { value: 1.4, show: false, color: Indicator.red },
        { value: 1.3, show: false, color: Indicator.red },
        { value: 1.2, show: false, color: Indicator.red },
        { value: 1.1, show: false, color: Indicator.orange },
        { value: 1.0, show: false, color: Indicator.orange },
        { value: 0.9, show: false, color: Indicator.orange },
        { value: 0.8, show: false, color: Indicator.orange },
        { value: 0.7, show: false, color: Indicator.green },
        { value: 0.6, show: false, color: Indicator.green },
        { value: 0.5, show: false, color: Indicator.green },
        { value: 0.4, show: false, color: Indicator.green },
        { value: 0.3, show: false, color: Indicator.yellow },
        { value: 0.2, show: false, color: Indicator.yellow },
        { value: 0.1, show: false, color: Indicator.yellow },
      ],
      isMinus: false,
    })
    const { y } = toRefs(props)
    watch(y, () => {
      // マイナス、プラスの判定
      g_y_bar.isMinus = props.x > 0
      // 少数点第1までの絶対値を取得
      const abs_g_y = Math.trunc(Math.abs(props.y) * 10) / 10
      for (let i = 0; i < g_y_bar.items.length; i++) {
        g_y_bar.items[i].show = g_y_bar.items[i].value < abs_g_y
      }
    })

    return { g_x_bar, g_y_bar, g_x: x, g_y: y, bar_max_count, Indicator }
  },
})
</script>

<style scoped>
.bar-style {
  height: calc(100vh / 15);
}
.bar-gray {
  background: rgb(172, 172, 172);
}
.bar-red {
  background: red;
}
.bar-orange {
  background: orange;
}
.bar-green {
  background: rgb(32, 224, 25);
}
.bar-yellow {
  background: yellow;
}
</style>
