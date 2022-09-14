import * as voiceData from '@/libs/gVoice/voiceData'
import { Ref } from 'vue'
import { Device } from '@/libs/constants'

/**
 * Gの音声出力に関するクラス
 */
class GVoice {
  // 最大GからGが減少したタイミングで音を鳴らす。
  // Gが減少したかどうかを判別するための基準のGを求める係数。上げると音がなるタイミングが速くなるがノイズを拾う可能性がある。
  private readonly g_decrease_width_rate = 0.6
  // 次の音を鳴らすまでの待ち時間
  private readonly next_voice_interval = 300
  // Gの計測間隔
  private readonly g_measurement_interval = 150

  // セットアップ済フラグ
  private is_setuped = false
  // g_x
  private ref_g_x: Ref<number>
  // g_y
  private ref_g_y: Ref<number>
  // device
  private device: Device

  /**
   * コンストラクタ
   * @param device
   * @param g_x
   * @param g_y
   */
  constructor(device: Device, g_x: Ref<number>, g_y: Ref<number>) {
    this.ref_g_x = g_x
    this.ref_g_y = g_y
    this.device = device
  }

  /**
   * セットアップ
   * ※ブラウザの仕様上クリックイベントから呼び出す事
   */
  setup(): void {
    if (!this.is_setuped) {
      this.is_setuped = true
      // iosの場合は１度再生しておかないとうまく再生されないのでその対応
      if (this.device === Device.ios) {
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
  }

  // タイマーの制御id
  private timer_id = 0
  /**
   * 音声出力 開始
   */
  start(): void {
    // 直前に音を鳴らした時間
    let before_sound_time = new Date().getTime()

    enum GDirection {
      Up,
      Down,
      Left,
      Right,
    }
    interface MaxGInfo {
      direction: GDirection
      g: number
      measurement_time: number
    }
    // 最大G(上)の情報
    const max_g_up_info: MaxGInfo = {
      direction: GDirection.Up,
      g: 0,
      measurement_time: 0,
    }
    // 最大G(右)の情報
    const max_g_right_info: MaxGInfo = {
      direction: GDirection.Right,
      g: 0,
      measurement_time: 0,
    }
    // 最大G(左)の情報
    const max_g_left_info: MaxGInfo = {
      direction: GDirection.Left,
      g: 0,
      measurement_time: 0,
    }

    // 音声出力
    this.timer_id = window.setInterval(() => {
      // Gを鳴らした後は一定時間Gを鳴らさない
      if (
        new Date().getTime() - before_sound_time >=
        this.next_voice_interval
      ) {
        const max_g_info_list = [
          max_g_up_info,
          max_g_left_info,
          max_g_right_info,
        ]
        // 計測時間が若い順にソート
        max_g_info_list.sort(function (a, b) {
          return a.measurement_time - b.measurement_time
        })
        // 音を鳴らすGを決定させる
        let sound_target_direction: GDirection | null = null
        for (let i = 0; i < max_g_info_list.length; i++) {
          const max_g_info = max_g_info_list[i]
          if (sound_target_direction != null) break
          if (max_g_info.g < 0.2) continue
          switch (max_g_info.direction) {
            case GDirection.Up:
              if (
                this.ref_g_y.value <
                max_g_info.g * this.g_decrease_width_rate
              ) {
                sound_target_direction = GDirection.Up
              }
              break
            case GDirection.Left:
              if (
                this.ref_g_x.value * -1 <
                max_g_info.g * this.g_decrease_width_rate
              ) {
                sound_target_direction = GDirection.Left
              }
              break
            case GDirection.Right:
              if (
                this.ref_g_x.value <
                max_g_info.g * this.g_decrease_width_rate
              ) {
                sound_target_direction = GDirection.Right
              }
              break
            default:
              break
          }
        }
        // 音を鳴らす
        switch (sound_target_direction) {
          case GDirection.Up:
            before_sound_time = new Date().getTime()
            console.log('up:' + before_sound_time)
            if (max_g_up_info.g <= 0.1) {
              voiceData.voice_g_up_1.play()
            } else if (max_g_up_info.g <= 0.2) {
              voiceData.voice_g_up_2.play()
            } else if (max_g_up_info.g <= 0.3) {
              voiceData.voice_g_up_3.play()
            } else if (max_g_up_info.g <= 0.4) {
              voiceData.voice_g_up_4.play()
            } else if (max_g_up_info.g <= 0.5) {
              voiceData.voice_g_up_5.play()
            } else if (max_g_up_info.g <= 0.6) {
              voiceData.voice_g_up_6.play()
            } else if (max_g_up_info.g <= 0.7) {
              voiceData.voice_g_up_7.play()
            } else if (max_g_up_info.g <= 0.8) {
              voiceData.voice_g_up_8.play()
            } else if (max_g_up_info.g <= 0.9) {
              voiceData.voice_g_up_9.play()
            } else if (max_g_up_info.g <= 1) {
              voiceData.voice_g_up_10.play()
            } else if (max_g_up_info.g <= 1.1) {
              voiceData.voice_g_up_11.play()
            } else if (max_g_up_info.g <= 1.2) {
              voiceData.voice_g_up_12.play()
            } else if (max_g_up_info.g <= 1.3) {
              voiceData.voice_g_up_13.play()
            } else if (max_g_up_info.g <= 1.4) {
              voiceData.voice_g_up_14.play()
            } else if (max_g_up_info.g > 1.4) {
              voiceData.voice_g_up_14.play()
            }
            max_g_up_info.g = 0
            max_g_up_info.measurement_time = 0
            break
          case GDirection.Left:
            before_sound_time = new Date().getTime()
            console.log('lef:' + before_sound_time)
            if (max_g_left_info.g <= 0.1) {
              voiceData.voice_g_left_1.play()
            } else if (max_g_left_info.g <= 0.2) {
              voiceData.voice_g_left_2.play()
            } else if (max_g_left_info.g <= 0.3) {
              voiceData.voice_g_left_3.play()
            } else if (max_g_left_info.g <= 0.4) {
              voiceData.voice_g_left_4.play()
            } else if (max_g_left_info.g <= 0.5) {
              voiceData.voice_g_left_5.play()
            } else if (max_g_left_info.g <= 0.6) {
              voiceData.voice_g_left_6.play()
            } else if (max_g_left_info.g <= 0.7) {
              voiceData.voice_g_left_7.play()
            } else if (max_g_left_info.g <= 0.8) {
              voiceData.voice_g_left_8.play()
            } else if (max_g_left_info.g <= 0.9) {
              voiceData.voice_g_left_9.play()
            } else if (max_g_left_info.g <= 1) {
              voiceData.voice_g_left_10.play()
            } else if (max_g_left_info.g <= 1.1) {
              voiceData.voice_g_left_11.play()
            } else if (max_g_left_info.g <= 1.2) {
              voiceData.voice_g_left_12.play()
            } else if (max_g_left_info.g <= 1.3) {
              voiceData.voice_g_left_13.play()
            } else if (max_g_left_info.g <= 1.4) {
              voiceData.voice_g_left_14.play()
            } else if (max_g_left_info.g > 1.4) {
              voiceData.voice_g_left_14.play()
            }
            max_g_left_info.g = 0
            max_g_left_info.measurement_time = 0
            break
          case GDirection.Right:
            before_sound_time = new Date().getTime()
            console.log('right:' + before_sound_time)
            if (max_g_right_info.g <= 0.1) {
              voiceData.voice_g_right_1.play()
            } else if (max_g_right_info.g <= 0.2) {
              voiceData.voice_g_right_2.play()
            } else if (max_g_right_info.g <= 0.3) {
              voiceData.voice_g_right_3.play()
            } else if (max_g_right_info.g <= 0.4) {
              voiceData.voice_g_right_4.play()
            } else if (max_g_right_info.g <= 0.5) {
              voiceData.voice_g_right_5.play()
            } else if (max_g_right_info.g <= 0.6) {
              voiceData.voice_g_right_6.play()
            } else if (max_g_right_info.g <= 0.7) {
              voiceData.voice_g_right_7.play()
            } else if (max_g_right_info.g <= 0.8) {
              voiceData.voice_g_right_8.play()
            } else if (max_g_right_info.g <= 0.9) {
              voiceData.voice_g_right_9.play()
            } else if (max_g_right_info.g <= 1) {
              voiceData.voice_g_right_10.play()
            } else if (max_g_right_info.g <= 1.1) {
              voiceData.voice_g_right_11.play()
            } else if (max_g_right_info.g <= 1.2) {
              voiceData.voice_g_right_12.play()
            } else if (max_g_right_info.g <= 1.3) {
              voiceData.voice_g_right_13.play()
            } else if (max_g_right_info.g <= 1.4) {
              voiceData.voice_g_right_14.play()
            } else if (max_g_right_info.g > 1.4) {
              voiceData.voice_g_right_14.play()
            }
            max_g_right_info.g = 0
            max_g_right_info.measurement_time = 0
            break
        }
      }

      // 最大前Gを保持
      const g_up = Math.trunc(this.ref_g_y.value * 10) / 10
      if (max_g_up_info.g < g_up) {
        max_g_up_info.g = g_up
        // console.log('up:' + g_up)
        max_g_up_info.measurement_time = new Date().getTime()
      }

      if (this.ref_g_x.value > 0) {
        // 最大右Gを保持
        const g_right = Math.trunc(this.ref_g_x.value * 10) / 10
        if (max_g_right_info.g < g_right) {
          max_g_right_info.g = g_right
          // console.log('right:' + g_right)
          max_g_right_info.measurement_time = new Date().getTime()
        }
      } else {
        // 最大左Gを保持
        const g_left = Math.trunc(this.ref_g_x.value * 10) / 10
        if (max_g_left_info.g * -1 > g_left) {
          max_g_left_info.g = Math.abs(g_left)
          // console.log('left:' + g_left)
          max_g_left_info.measurement_time = new Date().getTime()
        }
      }
    }, this.g_measurement_interval)
  }

  /**
   * 音声出力 停止
   */
  stop(): void {
    clearInterval(this.timer_id)
  }
}

export { GVoice }
