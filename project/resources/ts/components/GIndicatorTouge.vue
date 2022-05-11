<template>
  <div class="d-flex flex-row">
    <div class="w-50 border border-secondary">
      <p class="text-center text-white-50">←(X)→</p>
      <div
        v-for="item in g_x_bar.items"
        :key="item"
        class="d-flex align-items-center justify-content-center bar-style"
        :class="{
          'border-3 border-top border-orange': item.value == 0.3,
          'border-3 border-top border-red': item.value == 0.7,
        }"
      >
        <span
          class="indicator-style"
          :class="{
            'indicator-gray': !item.show,
            'indicator-red': item.show && item.color == Indicator.red,
            'indicator-orange': item.show && item.color == Indicator.orange,
            'indicator-green': item.show && item.color == Indicator.green,
            'indicator-yellow': item.show && item.color == Indicator.yellow,
          }"
          >■</span
        >
        <span class="text-white-50"> {{ item.value.toFixed(1) }} G </span>
      </div>
    </div>
    <div class="w-50 border border-secondary">
      <p class="text-center text-white-50">↑(Y)↓</p>
      <div
        v-for="item in g_y_bar.items"
        :key="item"
        class="d-flex align-items-center justify-content-center bar-style text-white-50"
        :class="{
          'border-3 border-top border-orange': item.value == 0.3,
          'border-3 border-top border-red': item.value == 0.7,
        }"
      >
        <span
          class="indicator-style"
          :class="{
            'indicator-gray': !item.show,
            'indicator-red': item.show && item.color == Indicator.red,
            'indicator-orange': item.show && item.color == Indicator.orange,
            'indicator-green': item.show && item.color == Indicator.green,
            'indicator-yellow': item.show && item.color == Indicator.yellow,
          }"
          >■</span
        >
        <span class="text-white-50"> {{ item.value.toFixed(1) }} G </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, toRefs } from 'vue'

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
    // g(x)バーの状態
    const g_x_bar = reactive({
      items: [
        { value: 1.0, show: false, color: Indicator.red },
        { value: 0.9, show: false, color: Indicator.red },
        { value: 0.8, show: false, color: Indicator.red },
        { value: 0.7, show: false, color: Indicator.orange },
        { value: 0.6, show: false, color: Indicator.orange },
        { value: 0.5, show: false, color: Indicator.orange },
        { value: 0.4, show: false, color: Indicator.orange },
        { value: 0.3, show: false, color: Indicator.green },
        { value: 0.2, show: false, color: Indicator.green },
        { value: 0.1, show: false, color: Indicator.green },
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
        { value: 1.0, show: false, color: Indicator.red },
        { value: 0.9, show: false, color: Indicator.red },
        { value: 0.8, show: false, color: Indicator.red },
        { value: 0.7, show: false, color: Indicator.orange },
        { value: 0.6, show: false, color: Indicator.orange },
        { value: 0.5, show: false, color: Indicator.orange },
        { value: 0.4, show: false, color: Indicator.orange },
        { value: 0.3, show: false, color: Indicator.green },
        { value: 0.2, show: false, color: Indicator.green },
        { value: 0.1, show: false, color: Indicator.green },
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

    return {
      g_x_bar,
      g_y_bar,
      g_x: x,
      g_y: y,
      Indicator,
    }
  },
})
</script>

<style scoped>
.bar-style {
  height: calc(100vh / 11);
}
.indicator-style {
  font-size: 35px;
}

.indicator-gray {
  color: #2f2f2f;
}
.indicator-red {
  color: red;
}
.indicator-orange {
  color: orange;
}
.indicator-green {
  color: rgb(32, 224, 25);
}
.indicator-yellow {
  color: rgb(219, 219, 33);
}

.border-orange {
  border-color: #ffa500c2 !important;
}
.border-red {
  border-color: #d36363 !important;
}
</style>
