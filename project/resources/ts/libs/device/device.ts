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
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      state.device = Device.smartPhone
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
