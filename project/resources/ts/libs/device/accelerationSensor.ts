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

  /**
   * フィルター
   * @param before
   * @param after
   * @returns
   */

  const filter = (before: number, after: number) => {
    // ローパスフィルター
    const LPF = (): number => {
      return before * 0.9 + after * 0.1
    }
    return {
      LPF: LPF,
    }
  }

  // ローパスフィルター用の値
  let beforeGX = 0
  let beforeGY = 0
  let beforeGZ = 0
  // 加速度センサーから値が取得できた時に呼ばれるイベント処理
  const deviceAcceleration = (e: DeviceMotionEvent) => {
    // 加速度センサーが有効になっているかどうかのチェック
    if (!state.isEnable) return
    // 加速度取得
    const acceleration = e.accelerationIncludingGravity
    if (acceleration === null) return

    // const startTime = Date.now()
    const e_acceleration_x = acceleration.x ?? 0
    const e_acceleration_y = acceleration.y ?? 0
    const e_acceleration_z = acceleration.z ?? 0

    // 加速度をGに変換
    const g_x = e_acceleration_x / 9.8
    const g_y = e_acceleration_y / 9.8
    const g_z = e_acceleration_z / 9.8

    // ローパスフィルタでのノイズ削除
    state.gX = filter(beforeGX, g_x).LPF()
    state.gY = filter(beforeGY, g_y).LPF()
    state.gZ = filter(beforeGZ, g_z).LPF()
    beforeGX = g_x
    beforeGY = g_y
    beforeGZ = g_z
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
