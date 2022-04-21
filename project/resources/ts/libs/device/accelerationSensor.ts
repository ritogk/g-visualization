import { InjectionKey, reactive, ToRefs, toRefs } from 'vue'

/**
 * 加速度センサーに関係するモジュール
 **/
type useAccelerationSensortType = {
  stateRefs: ToRefs<{ isEnable: boolean }>
  enableSensor(): void
  addEvent(func: any): void
  removeEvent(func: any): void
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
