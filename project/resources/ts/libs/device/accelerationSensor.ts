import { InjectionKey, reactive, ToRefs, toRefs } from 'vue'
import { Device } from '@/libs/constants'

/**
 * 加速度センサーに関係するモジュール
 **/
type useAccelerationSensortType = {
  stateRefs: ToRefs<{
    isEnable: boolean
    gX: number
    gY: number
    gZ: number
    adjustMovingAverage: number
  }>
  enableSensor(): Promise<boolean>
  addEvent(): void
  removeEvent(): void
}

const useAccelerationSensor = (device: Device): useAccelerationSensortType => {
  // 状態
  const state = reactive({
    isEnable: false,
    gX: 0,
    gY: 0,
    gZ: 0,
    adjustMovingAverage: 0,
  })

  /**
   * センサーを有効にします。
   */
  const enableSensor = async (): Promise<boolean> => {
    if (device === Device.ios) {
      // ios
      const response = await (DeviceMotionEvent as any).requestPermission()
      if (response === 'granted') {
        state.isEnable = true
        addEvent()
        return true
      } else {
        return false
      }
    } else {
      // android
      state.isEnable = true
      addEvent()
      return true
    }
  }

  /**
   * イベントハンドラを追加します。
   * @param func
   */
  const addEvent = () => {
    window.addEventListener('devicemotion', deviceAcceleration, false)
  }

  /**
   * イベントハンドラを削除します。
   * @param func
   */
  const removeEvent = () => {
    window.removeEventListener('devicemotion', deviceAcceleration, false)
  }

  // 移動平均を計算するためのログ
  const g_x_log: number[] = []
  const g_y_log: number[] = []
  const g_z_log: number[] = []
  // 移動平均用の区間数(デフォルト)
  const deafult_moving_average_section_cnt = 8

  // 加速度センサーから値が取得できた時に呼ばれるイベント処理
  const deviceAcceleration = (e: DeviceMotionEvent) => {
    // 加速度センサーが有効になっているかどうかのチェック
    if (!state.isEnable) return
    // 加速度取得
    const acceleration = e.acceleration
    if (acceleration === null) return

    // androidとiosでセンサーの値が+-逆になるのでその対応
    const coefficient = device === Device.ios ? 1 : -1
    const e_acceleration_x = acceleration.x ? acceleration.x * coefficient : 0
    const e_acceleration_y = acceleration.y ? acceleration.y * coefficient : 0
    const e_acceleration_z = acceleration.z ? acceleration.z * coefficient : 0

    // 加速度をGに変換
    const g_x = e_acceleration_x / 9.8
    const g_y = e_acceleration_y / 9.8
    const g_z = e_acceleration_z / 9.8

    const moving_average_section_cnt =
      deafult_moving_average_section_cnt + state.adjustMovingAverage * -1
    // x軸に対して移動平均の計算を行う。
    if (g_x_log.length >= moving_average_section_cnt) {
      const avg =
        g_x_log.reduce((sum, element) => sum + element, 0) /
        moving_average_section_cnt
      state.gX = avg
      g_x_log.splice(0, 1)
    }
    g_x_log.push(g_x)

    // y軸に対して移動平均の計算を行う。
    if (g_y_log.length >= moving_average_section_cnt) {
      const avg =
        g_y_log.reduce((sum, element) => sum + element, 0) /
        moving_average_section_cnt
      state.gY = avg
      g_y_log.splice(0, 1)
    }
    g_y_log.push(g_y)

    // z軸に対して移動平均の計算を行う。
    if (g_z_log.length >= moving_average_section_cnt) {
      const avg =
        g_z_log.reduce((sum, element) => sum + element, 0) /
        moving_average_section_cnt
      state.gZ = avg
      g_z_log.splice(0, 1)
    }
    g_z_log.push(g_z)
  }

  return {
    stateRefs: toRefs(state),
    enableSensor: enableSensor,
    addEvent: addEvent,
    removeEvent: removeEvent,
  }
}

const useAccelerationSensortKey: InjectionKey<useAccelerationSensortType> =
  Symbol('useAccelerationSensort')

export {
  useAccelerationSensor,
  useAccelerationSensortType,
  useAccelerationSensortKey,
}
