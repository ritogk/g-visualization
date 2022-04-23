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
    const canvas_width = 375
    const canvas_height = 375
    // gサークルの直径
    const g_circle_diameter = 342
    // gオブジェクトの直径
    const g_object_diameter = 6

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
          // gオブジェクトを描画
          // 1.2~-1.2Gを342~0の範囲内に変換して描画
          p.fill(rgbRed, rgbGreen, rgbBlue)
          p.stroke(0)
          p.strokeWeight(1)
          p.rect(
            adjust_x(props.x),
            adjust_y(props.y),
            g_object_diameter,
            g_object_diameter
          )

          // x軸とy軸のgの和を表示
          p.fill(255)
          p.noStroke()
          p.rect(canvas_width - 29, 1, 23, 10)
          p.fill(0)
          const g_xy =
            Math.ceil(Math.sqrt(props.x ** 2 + props.y ** 2) * 10) / 10
          p.text(g_xy === 0 ? 0.0 : g_xy + 'G', canvas_width - 28, 10)
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
        p.stroke(0, 0, 0)
        p.strokeWeight(1)
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
        p.strokeWeight(0)
        const cicle_interval = canvas_height / 2 / 6
        p.text('1.2G', canvas_width / 2 + 2, cicle_interval * 1 - 10)
        p.text('1.0G', canvas_width / 2 + 2, cicle_interval * 2 - 13)
        p.text('0.8G', canvas_width / 2 + 2, cicle_interval * 3 - 16)
        p.text('0.6G', canvas_width / 2 + 2, cicle_interval * 4 - 18)
        p.text('0.4G', canvas_width / 2 + 2, cicle_interval * 5 - 20)
        p.text('0.2G', canvas_width / 2 + 2, cicle_interval * 6 - 22)
        p.text('Y', canvas_width / 2 - 13, 13)
        p.text('X', canvas_width - 11, canvas_height / 2 - 5)
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
