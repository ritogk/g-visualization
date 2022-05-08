import { InjectionKey, reactive, ToRefs, toRefs } from 'vue'

/**
 * 加速度センサーに関係するモジュール
 **/
type useAccelerationSensortType = {
  stateRefs: ToRefs<{ isEnable: boolean; gX: number; gY: number; gZ: number }>
  enableSensor(): void
  addEvent(): void
  removeEvent(func: any): void
}

const useAccelerationSensor = (): useAccelerationSensortType => {
  // 状態
  const state = reactive({ isEnable: false, gX: 0, gY: 0, gZ: 0 })

  /**
   * センサーを有効にします。
   */
  const enableSensor = () => {
    // prettier-ignore
    (DeviceMotionEvent as any)
    .requestPermission()
    .then(function (response: string) {
        if (response === 'granted') {
          state.isEnable = true;
          addEvent()
        }
    })
    .catch(function (e: any) {
        console.log(e)
        state.isEnable = true
    })
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
  const removeEvent = (func: (e: DeviceMotionEvent) => void) => {
    window.removeEventListener('devicemotion', func, false)
  }

  // 移動平均を計算するためのログ
  const g_x_log: number[] = []
  const g_y_log: number[] = []
  const g_z_log: number[] = []
  // 移動平均用の区間数
  const log_section_cnt = 10

  // 加速度センサーから値が取得できた時に呼ばれるイベント処理
  const deviceAcceleration = (e: DeviceMotionEvent) => {
    // 加速度センサーが有効になっているかどうかのチェック
    if (!state.isEnable) return
    // 加速度取得
    const acceleration = e.acceleration
    if (acceleration === null) return

    // const startTime = Date.now()
    const e_acceleration_x = acceleration.x ?? 0
    const e_acceleration_y = acceleration.y ?? 0
    const e_acceleration_z = acceleration.z ?? 0

    // 加速度をGに変換
    const g_x = e_acceleration_x / 9.8
    const g_y = e_acceleration_y / 9.8
    const g_z = e_acceleration_z / 9.8

    // x軸に対して移動平均の計算を行う。
    if (g_x_log.length >= log_section_cnt) {
      const avg =
        g_x_log.reduce((sum, element) => sum + element, 0) / log_section_cnt
      state.gX = avg
      g_x_log.splice(0, 1)
    }
    g_x_log.push(g_x)

    // y軸に対して移動平均の計算を行う。
    if (g_y_log.length >= log_section_cnt) {
      const avg =
        g_y_log.reduce((sum, element) => sum + element, 0) / log_section_cnt
      state.gY = avg
      g_y_log.splice(0, 1)
    }
    g_y_log.push(g_y)

    // z軸に対して移動平均の計算を行う。
    if (g_z_log.length >= log_section_cnt) {
      const avg =
        g_z_log.reduce((sum, element) => sum + element, 0) / log_section_cnt
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
