<template>
  <div id="p5Canvas"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { touge_max_g } from '@/libs/constants'
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
    const sketch = (p: p5) => {
      const canvas_width = 375
      const canvas_height = 375
      // gサークルの直径
      const g_circle_diameter = 342
      // gオブジェクトの直径
      const g_object_diameter = 6

      // 初期化
      p.setup = () => {
        const canvas = p.createCanvas(canvas_width, canvas_height)
        canvas.parent('p5Canvas')
        p.background(43, 53, 63)
        p.angleMode('degrees')
        p.frameRate(60)
        p.translate(canvas_width / 2, canvas_height / 2)
        initCanvas()
      }

      // メインの描画
      let rgbRed = 255
      let rgbGreen = 255
      let rgbBlue = 255
      p.draw = () => {
        if (props.draw) {
          // setupで定義していても何故か初期化される
          p.translate(canvas_width / 2, canvas_height / 2)
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
          p.fill(43, 53, 63)
          p.noStroke()
          p.rect(canvas_width / 2 - 32, (canvas_height / 2) * -1 + 3, 30, 18)
          p.fill(158, 158, 147)
          const g_xy =
            Math.ceil(Math.sqrt(props.x ** 2 + props.y ** 2) * 10) / 10
          p.text(
            g_xy === 0 ? 0.0 : g_xy + 'G',
            canvas_width / 2 - 32,
            (canvas_height / 2) * -1 + 13
          )

          //p.text('前', 0 - 20, (canvas_height / 2) * -1 + 13)
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

      // キャンバスの初期化
      const initCanvas = () => {
        // キャンバスの枠を描画
        p.fill(43, 53, 63)
        p.noStroke()
        p.strokeWeight(1)
        p.rect(
          -canvas_width / 2,
          -canvas_height / 2,
          canvas_width,
          canvas_height
        )

        p.noFill()
        p.stroke(158, 158, 147)
        // gサークルを描画
        p.ellipse(0, 0, g_circle_diameter)
        const num = touge_max_g * 10
        p.ellipse(0, 0, (g_circle_diameter * 10) / num)
        p.ellipse(0, 0, (g_circle_diameter * 8) / num)
        p.ellipse(0, 0, (g_circle_diameter * 6) / num)
        p.ellipse(0, 0, (g_circle_diameter * 4) / num)
        p.ellipse(0, 0, (g_circle_diameter * 2) / num)

        // gサークルの横線を描画
        p.line((g_circle_diameter / 2) * -1, 0, g_circle_diameter / 2, 0)
        // gサークルの縦線を描画
        p.line(0, (g_circle_diameter / 2) * -1, 0, g_circle_diameter / 2)

        // ラベルを描画
        p.fill(158, 158, 147)
        p.strokeWeight(0)
        const cicle_interval = g_circle_diameter / 2 / 5

        p.text('1.0G', 0, cicle_interval * 5 * -1 + 5)
        p.text('0.8G', 0, cicle_interval * 4 * -1 + 5)
        p.text('0.6G', 0, cicle_interval * 3 * -1 + 5)
        p.text('0.4G', 0, cicle_interval * 2 * -1 + 5)
        p.text('0.2G', 0, cicle_interval * -1 + 5)

        p.text('前', 0 - 20, (canvas_height / 2) * -1 + 13)
        p.text('後', 0 - 20, canvas_height / 2 - 4)
        p.text('右', canvas_width / 2 - 15, -10)
        p.text('左', (canvas_width / 2) * -1 + 1, -10)

        // 時間軸を描画
        p.stroke(158, 158, 147)
        p.strokeWeight(1)
        for (let i = 0; i < 12; i++) {
          p.rotate(30)
          p.strokeWeight(2)
          p.line(
            0,
            -(g_circle_diameter / 2) - 3,
            0,
            -(g_circle_diameter / 2) + 2
          )
          //p.strokeWeight(0)
          //p.text(i + 1, -4, -(g_circle_diameter / 2) - 6)
        }
      }

      // gからキャンバス用のx座標に変換
      const adjust_x = (g: number) => {
        // gオブジェクトの半径
        const g_object_radius = g_object_diameter / 2
        return (g * (g_circle_diameter / 2)) / touge_max_g - g_object_radius
      }

      // gからキャンバス用のy座標に変換
      const adjust_y = (g: number) => {
        // gオブジェクトの半径
        const g_object_radius = g_object_diameter / 2
        return (
          ((g * (g_circle_diameter / 2)) / touge_max_g + g_object_radius) * -1
        )
      }
    }

    onMounted(() => {
      new p5(sketch)
    })

    return {}
  },
})
</script>
