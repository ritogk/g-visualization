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
    const canvas_width = 424
    const canvas_height = 424
    // gサークルの直径
    const g_circle_diameter = 374
    // gオブジェクトの直径
    const g_object_diameter = 10

    let rgbRed = 255
    let rgbGreen = 255
    let rgbBlue = 255

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(canvas_width, canvas_height)
        initCanvas()

        p.frameRate(60)
      }

      p.draw = () => {
        if (props.draw) {
          // 図形の色を変更
          p.fill(rgbRed, rgbGreen, rgbBlue)
          // 1.1~-1.1Gを374~0の範囲内に変換して描画
          p.rect(adjust_x(props.x), adjust_y(props.y), 10, 10)
          if (rgbRed == 0) {
            initCanvas()
            rgbRed = 255
            rgbGreen = 255
          } else {
            rgbRed--
            rgbGreen--
          }
        }
      }

      const initCanvas = () => {
        p.fill(255)
        // キャンバスの枠を描画
        p.rect(0, 0, canvas_width, canvas_height)
        // gサークルを描画
        p.ellipse(canvas_width / 2, canvas_height / 2, g_circle_diameter)
        // gサークルを描画
        p.ellipse(
          canvas_width / 2,
          canvas_height / 2,
          (g_circle_diameter * 10) / 12
        )
        p.ellipse(
          canvas_width / 2,
          canvas_height / 2,
          (g_circle_diameter * 8) / 12
        )
        p.ellipse(
          canvas_width / 2,
          canvas_height / 2,
          (g_circle_diameter * 6) / 12
        )
        p.ellipse(
          canvas_width / 2,
          canvas_height / 2,
          (g_circle_diameter * 4) / 12
        )
        p.ellipse(
          canvas_width / 2,
          canvas_height / 2,
          (g_circle_diameter * 2) / 12
        )
        // gサークルの横線を描画
        p.line(0, canvas_height / 2, canvas_width, canvas_height / 2)
        // gサークルの縦線を描画
        p.line(canvas_width / 2, 0, canvas_width / 2, canvas_height)

        // ラベルを描画
        p.fill(0)
        const cicle_interval = canvas_height / 2 / 6
        p.text('1.2G', canvas_width / 2 + 2, cicle_interval * 1 - 1 * 4)
        p.text('1.0G', canvas_width / 2 + 2, cicle_interval * 2 - 2 * 4)
        p.text('0.8G', canvas_width / 2 + 2, cicle_interval * 3 - 3 * 4)
        p.text('0.6G', canvas_width / 2 + 2, cicle_interval * 4 - 4 * 4)
        p.text('0.4G', canvas_width / 2 + 2, cicle_interval * 5 - 5 * 4)
        p.text('0.2G', canvas_width / 2 + 2, cicle_interval * 6 - 6 * 4)
        p.text('Y', canvas_width / 2 - 13, 18)
        p.text('X', canvas_width - 17, canvas_height / 2 - 6)
      }
    }

    // gからキャンバス用のx座標に変換
    const adjust_x = (g: number) => {
      // キャンバスと円の隙間の幅
      const gap = (canvas_width - g_circle_diameter) / 2
      // gオブジェクトの半径
      const g_object_radius = g_object_diameter / 2
      return (
        gap - g_object_radius + ((g + max_g) * g_circle_diameter) / (max_g * 2)
      )
    }

    // gからキャンバス用のy座標に変換
    const adjust_y = (g: number) => {
      // キャンバスと円の隙間の幅
      const gap = (canvas_width - g_circle_diameter) / 2
      // gオブジェクトの半径
      const g_object_radius = g_object_diameter / 2
      return (
        gap -
        g_object_radius +
        (((g + max_g) * g_circle_diameter) / (max_g * 2) - g_circle_diameter) *
          -1
      )
    }

    new p5(sketch)

    return {}
  },
})
</script>
