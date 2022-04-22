<template>
  <p>作図</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { max_g } from '@/libs/constants'
import p5 from 'p5'

export default defineComponent({
  name: 'Index',
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
    const canvas_width = 374
    const canvas_height = 374
    let rgbRed = 255
    let rgbGreen = 255
    let rgbBlue = 255

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(canvas_width, canvas_height)

        // 外枠を描画
        p.fill(255)
        p.rect(0, 0, canvas_width, canvas_height)
        p.frameRate(60)
      }

      p.draw = () => {
        if (props.draw) {
          // 図形の色を変更
          p.fill(rgbRed, rgbGreen, rgbBlue)
          // 1.1~-1.1Gを374~0の範囲内に変換して描画
          p.rect(adjust_x(props.x), adjust_y(props.y), 10, 10)
          if (rgbRed == 0) {
            p.fill(255)
            p.rect(0, 0, canvas_width, canvas_width)
            rgbRed = 255
            rgbGreen = 255
          } else {
            rgbRed--
            rgbGreen--
          }
        }
      }
    }

    // gからキャンバス用のx座標に変換
    const adjust_x = (g: number) => {
      return ((g + max_g) * canvas_width) / (max_g * 2)
    }

    // gからキャンバス用のy座標に変換
    const adjust_y = (g: number) => {
      return (((g + max_g) * canvas_height) / (max_g * 2) - canvas_height) * -1
    }

    new p5(sketch)

    return {}
  },
})
</script>
