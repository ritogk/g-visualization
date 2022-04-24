import { InjectionKey, reactive, ToRefs, toRefs } from 'vue'

/**
 * 加速度センサーに関係するモジュール
 * このモジュール内でリアルタイムのGや加速度を保持すると極端に反映が遅くなるので呼び出し側で保持すること
 **/
type useAccelerationSensortType = {
  stateRefs: ToRefs<{ isEnable: boolean }>
  enableSensor(): void
  addEvent(func: any): void
  removeEvent(func: any): void
  filter: (
    before: number,
    after: number
  ) => {
    LPF(): number
  }
}

const useAccelerationSensor = (): useAccelerationSensortType => {
  // 状態
  const state = reactive({ isEnable: false })

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
  const addEvent = (func: (e: DeviceMotionEvent) => void) => {
    window.addEventListener('devicemotion', func, false)
  }

  /**
   * イベントハンドラを削除します。
   * @param func
   */
  const removeEvent = (func: (e: DeviceMotionEvent) => void) => {
    window.removeEventListener('devicemotion', func, false)
  }

  const filter = (before: number, after: number) => {
    // ローパスフィルター
    const LPF = (): number => {
      return before * 0.9 + after * 0.1
    }
    return {
      LPF: LPF,
    }
  }

  return {
    stateRefs: toRefs(state),
    enableSensor: enableSensor,
    addEvent: addEvent,
    removeEvent: removeEvent,
    filter: filter,
  }
}

const useAccelerationSensortKey: InjectionKey<useAccelerationSensortType> =
  Symbol('useAccelerationSensort')

export {
  useAccelerationSensor,
  useAccelerationSensortType,
  useAccelerationSensortKey,
}
