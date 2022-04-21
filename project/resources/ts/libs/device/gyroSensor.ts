import { InjectionKey, reactive, ToRefs, toRefs } from 'vue'

/**
 * ジャイロセンサーに関係するモジュール
 **/

type useGyroSensortType = {
  stateRefs: ToRefs<{ isEnable: boolean }>
  enableSensor(): void
  addEvent(func: any): void
  removeEvent(func: any): void
}

const useGyroSensor = (): useGyroSensortType => {
  // 状態
  const state = reactive({ isEnable: false })

  /**
   * センサーを有効にします。
   */
  const enableSensor = () => {
    // prettier-ignore
    (DeviceOrientationEvent as any)
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
  const addEvent = (func: (e: DeviceOrientationEvent) => void) => {
    window.addEventListener('deviceorientation', func, false)
  }

  /**
   * イベントハンドラを削除します。
   * @param func
   */
  const removeEvent = (func: (e: DeviceOrientationEvent) => void) => {
    window.removeEventListener('deviceorientation', func, false)
  }

  return {
    stateRefs: toRefs(state),
    enableSensor: enableSensor,
    addEvent: addEvent,
    removeEvent: removeEvent,
  }
}

const useGyroSensortKey: InjectionKey<useGyroSensortType> =
  Symbol('useGyroSensort')

export { useGyroSensor, useGyroSensortType, useGyroSensortKey }
