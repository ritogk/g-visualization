import { InjectionKey, reactive, ToRefs, toRefs } from 'vue'
import { Device } from '@/libs/constants'

/**
 * ジャイロセンサーに関係するモジュール
 **/

type useGyroSensortType = {
  stateRefs: ToRefs<{ isEnable: boolean; x: number; y: number; z: number }>
  enableSensor(): Promise<boolean>
  addEvent(): void
  removeEvent(): void
}

const useGyroSensor = (device: Device): useGyroSensortType => {
  // 状態
  const state = reactive({ isEnable: false, x: 0, y: 0, z: 0 })

  /**
   * センサーを有効にします。
   */
  const enableSensor = async (): Promise<boolean> => {
    if (device === Device.ios) {
      // ios
      const response = await (DeviceOrientationEvent as any).requestPermission()
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
    window.addEventListener('deviceorientation', deviceGyro, false)
  }

  /**
   * イベントハンドラを削除します。
   * @param func
   */
  const removeEvent = () => {
    window.removeEventListener('deviceorientation', deviceGyro, false)
  }

  let beforeX = 0
  let beforeY = 0
  let beforeZ = 0
  // ジャイロセンサーから値が取得できた時に呼ばれるイベント処理
  const deviceGyro = (e: DeviceOrientationEvent) => {
    if (!state.isEnable) return
    if (e.alpha === null || e.beta === null || e.gamma === null) return
    // ローパスフィルターをかける
    state.x = filter(beforeX, e.beta).LPF()
    state.y = filter(beforeY, e.gamma).LPF()
    state.z = filter(beforeZ, e.alpha).LPF()
    beforeX = state.x
    beforeY = state.y
    beforeZ = state.z
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
