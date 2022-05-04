import { InjectionKey, reactive, ToRefs, toRefs } from 'vue'
import { Device } from '@/libs/constants'

/**
 * 端末の情報に関係するモジュール
 **/

type useDeviceType = {
  stateRefs: ToRefs<{ device: Device }>
  setDevice(): void
}

const useDevice = (): useDeviceType => {
  // 状態
  const state = reactive({ device: Device.pc })

  /**
   * 端末がpc、スマホかどうかの判別を行います。
   */
  const setDevice = () => {
    const ua = navigator.userAgent
    if (/android/i.test(ua)) {
      state.device = Device.android
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    ) {
      state.device = Device.ios
    } else {
      state.device = Device.pc
    }
  }

  return {
    stateRefs: toRefs(state),
    setDevice: setDevice,
  }
}

const useDeviceKey: InjectionKey<useDeviceType> = Symbol('useDevice')

export { useDevice, useDeviceType, useDeviceKey }
