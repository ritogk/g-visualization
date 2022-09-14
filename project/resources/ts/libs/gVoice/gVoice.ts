import * as voiceData from '@/libs/gVoice/voiceData'
import { Ref } from 'vue'
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
interface MaxGInfo {
  direction: Direction
  g: number
  measurement_time: number
}

class GVoice {
  // 大きくすればするほど音の再生が速くなる。
  private sound_adjustment_rate = 0.3
  private audio_time_interval = 300
  private set_interval = 150
  private timer_id = 0

  private is_setuped = false
  private ref_g_x: Ref<number>
  private ref_g_y: Ref<number>

  private audio_st_time = new Date().getTime()
  private max_g_up_info: MaxGInfo = {
    direction: Direction.Up,
    g: 0,
    measurement_time: 0,
  }
  private max_g_right_info: MaxGInfo = {
    direction: Direction.Right,
    g: 0,
    measurement_time: 0,
  }
  private max_g_left_info: MaxGInfo = {
    direction: Direction.Left,
    g: 0,
    measurement_time: 0,
  }

  constructor(g_x: Ref<number>, g_y: Ref<number>) {
    this.ref_g_x = g_x
    this.ref_g_y = g_y
  }

  /**
   * セットアップ
   * ※ブラウザの仕様上クリックイベントから呼び出す事
   */
  setup(): void {
    // １度再生しておかないとスマホでうまく再生されないのでその対応
    if (!this.is_setuped) {
      this.is_setuped = true
      // up
      voiceData.voice_g_up_1.play()
      voiceData.voice_g_up_2.play()
      voiceData.voice_g_up_3.play()
      voiceData.voice_g_up_4.play()
      voiceData.voice_g_up_5.play()
      voiceData.voice_g_up_6.play()
      voiceData.voice_g_up_7.play()
      voiceData.voice_g_up_8.play()
      voiceData.voice_g_up_9.play()
      voiceData.voice_g_up_10.play()
      voiceData.voice_g_up_11.play()
      voiceData.voice_g_up_12.play()
      voiceData.voice_g_up_13.play()
      voiceData.voice_g_up_14.play()
      // down
      voiceData.voice_g_down_1.play()
      voiceData.voice_g_down_2.play()
      voiceData.voice_g_down_3.play()
      voiceData.voice_g_down_4.play()
      voiceData.voice_g_down_5.play()
      voiceData.voice_g_down_6.play()
      voiceData.voice_g_down_7.play()
      voiceData.voice_g_down_8.play()
      voiceData.voice_g_down_9.play()
      voiceData.voice_g_down_10.play()
      voiceData.voice_g_down_11.play()
      voiceData.voice_g_down_12.play()
      voiceData.voice_g_down_13.play()
      voiceData.voice_g_down_14.play()
      // left
      voiceData.voice_g_left_1.play()
      voiceData.voice_g_left_2.play()
      voiceData.voice_g_left_3.play()
      voiceData.voice_g_left_4.play()
      voiceData.voice_g_left_5.play()
      voiceData.voice_g_left_6.play()
      voiceData.voice_g_left_7.play()
      voiceData.voice_g_left_8.play()
      voiceData.voice_g_left_9.play()
      voiceData.voice_g_left_10.play()
      voiceData.voice_g_left_11.play()
      voiceData.voice_g_left_12.play()
      voiceData.voice_g_left_13.play()
      voiceData.voice_g_left_14.play()
      // right
      voiceData.voice_g_right_1.play()
      voiceData.voice_g_right_2.play()
      voiceData.voice_g_right_3.play()
      voiceData.voice_g_right_4.play()
      voiceData.voice_g_right_5.play()
      voiceData.voice_g_right_6.play()
      voiceData.voice_g_right_7.play()
      voiceData.voice_g_right_8.play()
      voiceData.voice_g_right_9.play()
      voiceData.voice_g_right_10.play()
      voiceData.voice_g_right_11.play()
      voiceData.voice_g_right_12.play()
      voiceData.voice_g_right_13.play()
      voiceData.voice_g_right_14.play()
    }
  }

  /**
   * 音声出力 開始
   */
  start(): void {
    this.timer_id = window.setInterval(() => {
      // Gを鳴らした後は一定時間Gを鳴らさない
      if (
        new Date().getTime() - this.audio_st_time >=
        this.audio_time_interval
      ) {
        const max_g_info_list = [
          this.max_g_up_info,
          this.max_g_left_info,
          this.max_g_right_info,
        ]
        // 計測時間が若い順にソート
        max_g_info_list.sort(function (a, b) {
          return a.measurement_time - b.measurement_time
        })
        // 音を鳴らすGを決定させる
        let sound_target_direction: Direction | null = null
        for (let i = 0; i < max_g_info_list.length; i++) {
          const max_g_info = max_g_info_list[i]
          if (sound_target_direction != null) break
          if (max_g_info.g < 0.2) continue
          switch (max_g_info.direction) {
            case Direction.Up:
              if (
                this.ref_g_y.value <
                max_g_info.g * this.sound_adjustment_rate
              ) {
                sound_target_direction = Direction.Up
              }
              break
            case Direction.Left:
              if (
                this.ref_g_x.value * -1 <
                max_g_info.g * this.sound_adjustment_rate
              ) {
                sound_target_direction = Direction.Left
              }
              break
            case Direction.Right:
              if (
                this.ref_g_x.value <
                max_g_info.g * this.sound_adjustment_rate
              ) {
                sound_target_direction = Direction.Right
              }
              break
            default:
              break
          }
        }
        // 音を鳴らす
        switch (sound_target_direction) {
          case Direction.Up:
            this.audio_st_time = new Date().getTime()
            if (this.max_g_up_info.g <= 0.1) {
              voiceData.voice_g_up_1.play()
            } else if (this.max_g_up_info.g <= 0.2) {
              voiceData.voice_g_up_2.play()
            } else if (this.max_g_up_info.g <= 0.3) {
              voiceData.voice_g_up_3.play()
            } else if (this.max_g_up_info.g <= 0.4) {
              voiceData.voice_g_up_4.play()
            } else if (this.max_g_up_info.g <= 0.5) {
              voiceData.voice_g_up_5.play()
            } else if (this.max_g_up_info.g <= 0.6) {
              voiceData.voice_g_up_6.play()
            } else if (this.max_g_up_info.g <= 0.7) {
              voiceData.voice_g_up_7.play()
            } else if (this.max_g_up_info.g <= 0.8) {
              voiceData.voice_g_up_8.play()
            } else if (this.max_g_up_info.g <= 0.9) {
              voiceData.voice_g_up_9.play()
            } else if (this.max_g_up_info.g <= 1) {
              voiceData.voice_g_up_10.play()
            } else if (this.max_g_up_info.g <= 1.1) {
              voiceData.voice_g_up_11.play()
            } else if (this.max_g_up_info.g <= 1.2) {
              voiceData.voice_g_up_12.play()
            } else if (this.max_g_up_info.g <= 1.3) {
              voiceData.voice_g_up_13.play()
            } else if (this.max_g_up_info.g <= 1.4) {
              voiceData.voice_g_up_14.play()
            } else if (this.max_g_up_info.g > 1.4) {
              voiceData.voice_g_up_14.play()
            }
            this.max_g_up_info.g = 0
            this.max_g_up_info.measurement_time = 0
            break
          case Direction.Left:
            this.audio_st_time = new Date().getTime()
            if (this.max_g_left_info.g <= 0.1) {
              voiceData.voice_g_left_1.play()
            } else if (this.max_g_left_info.g <= 0.2) {
              voiceData.voice_g_left_2.play()
            } else if (this.max_g_left_info.g <= 0.3) {
              voiceData.voice_g_left_3.play()
            } else if (this.max_g_left_info.g <= 0.4) {
              voiceData.voice_g_left_4.play()
            } else if (this.max_g_left_info.g <= 0.5) {
              voiceData.voice_g_left_5.play()
            } else if (this.max_g_left_info.g <= 0.6) {
              voiceData.voice_g_left_6.play()
            } else if (this.max_g_left_info.g <= 0.7) {
              voiceData.voice_g_left_7.play()
            } else if (this.max_g_left_info.g <= 0.8) {
              voiceData.voice_g_left_8.play()
            } else if (this.max_g_left_info.g <= 0.9) {
              voiceData.voice_g_left_9.play()
            } else if (this.max_g_left_info.g <= 1) {
              voiceData.voice_g_left_10.play()
            } else if (this.max_g_left_info.g <= 1.1) {
              voiceData.voice_g_left_11.play()
            } else if (this.max_g_left_info.g <= 1.2) {
              voiceData.voice_g_left_12.play()
            } else if (this.max_g_left_info.g <= 1.3) {
              voiceData.voice_g_left_13.play()
            } else if (this.max_g_left_info.g <= 1.4) {
              voiceData.voice_g_left_14.play()
            } else if (this.max_g_left_info.g > 1.4) {
              voiceData.voice_g_left_14.play()
            }
            this.max_g_left_info.g = 0
            this.max_g_left_info.measurement_time = 0
            break
          case Direction.Right:
            console.log(this.max_g_right_info.g)
            this.audio_st_time = new Date().getTime()
            if (this.max_g_right_info.g <= 0.1) {
              voiceData.voice_g_right_1.play()
            } else if (this.max_g_right_info.g <= 0.2) {
              voiceData.voice_g_right_2.play()
            } else if (this.max_g_right_info.g <= 0.3) {
              voiceData.voice_g_right_3.play()
            } else if (this.max_g_right_info.g <= 0.4) {
              voiceData.voice_g_right_4.play()
            } else if (this.max_g_right_info.g <= 0.5) {
              voiceData.voice_g_right_5.play()
            } else if (this.max_g_right_info.g <= 0.6) {
              voiceData.voice_g_right_6.play()
            } else if (this.max_g_right_info.g <= 0.7) {
              voiceData.voice_g_right_7.play()
            } else if (this.max_g_right_info.g <= 0.8) {
              voiceData.voice_g_right_8.play()
            } else if (this.max_g_right_info.g <= 0.9) {
              voiceData.voice_g_right_9.play()
            } else if (this.max_g_right_info.g <= 1) {
              voiceData.voice_g_right_10.play()
            } else if (this.max_g_right_info.g <= 1.1) {
              voiceData.voice_g_right_11.play()
            } else if (this.max_g_right_info.g <= 1.2) {
              voiceData.voice_g_right_12.play()
            } else if (this.max_g_right_info.g <= 1.3) {
              voiceData.voice_g_right_13.play()
            } else if (this.max_g_right_info.g <= 1.4) {
              voiceData.voice_g_right_14.play()
            } else if (this.max_g_right_info.g > 1.4) {
              voiceData.voice_g_right_14.play()
            }
            this.max_g_right_info.g = 0
            this.max_g_right_info.measurement_time = 0
            break
        }
      }

      // 最大前Gを保持
      const g_up = Math.trunc(this.ref_g_y.value * 10) / 10
      if (this.max_g_up_info.g < g_up) {
        this.max_g_up_info.g = g_up
        console.log('up:' + g_up)
        this.max_g_up_info.measurement_time = new Date().getTime()
      }

      if (this.ref_g_x.value > 0) {
        // 最大右Gを保持
        const g_right = Math.trunc(this.ref_g_x.value * 10) / 10
        if (this.max_g_right_info.g < g_right) {
          this.max_g_right_info.g = g_right
          console.log('right:' + g_right)
          this.max_g_right_info.measurement_time = new Date().getTime()
        }
      } else {
        // 最大左Gを保持
        const g_left = Math.trunc(this.ref_g_x.value * 10) / 10
        if (this.max_g_left_info.g * -1 > g_left) {
          this.max_g_left_info.g = Math.abs(g_left)
          console.log('left:' + g_left)
          this.max_g_left_info.measurement_time = new Date().getTime()
        }
      }
    }, this.set_interval)
  }

  /**
   * 音声出力 停止
   */
  stop(): void {
    clearInterval(this.timer_id)
  }
}

export { GVoice }
