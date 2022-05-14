<template>
  <button
    :disabled="isAccelerationSensor"
    type="button"
    class="btn btn-success w-100 mb-1"
    @click="clickStartSensor()"
  >
    {{ t('message.①センサーを有効にする') }}</button
  ><br />
  <button
    type="button"
    class="btn btn-primary w-100 mb-1"
    :disabled="!isAccelerationSensor || isCalibrated1 || isCalibrated2"
    @click="cickCalibration()"
  >
    {{ t('message.②キャリブレーション') }}
  </button>
  <button
    type="button"
    class="btn btn-light w-100"
    :disabled="!isCalibrated2"
    :class="{
      'bg-danger': isDriving,
    }"
    hidden
    @click="clickDrivingStart"
  >
    ④ドライビングスタート</button
  ><br />

  <button
    type="button"
    class="btn btn-light w-100"
    hidden
    @click="clickLogDownload"
  >
    ログダウンロード
  </button>

  <!-- maxg変更-->
  <div class="mb-1">
    <button
      type="button"
      class="btn btn-secondary w-50"
      :class="{
        active: isCircuit,
      }"
      @click="clickMaxG14"
    >
      Max1.4G
    </button>
    <button
      type="button"
      class="btn btn-secondary w-50"
      :class="{
        active: isTouge,
      }"
      @click="clickMaxG10"
    >
      Max1.0G
    </button>
  </div>

  <div class="mb-1">
    <button
      type="button"
      class="btn btn-secondary w-50"
      :class="{
        active: isGBowl,
      }"
      @click="clickGBowl"
    >
      GBowl
    </button>
    <button
      type="button"
      class="btn btn-secondary w-50"
      :class="{
        active: isGIndicator,
      }"
      @click="clickGIndicator"
    >
      GIndicator
    </button>
  </div>

  <!-- G感度調整 -->
  <div class="mx-5 mb-4 mt-2">
    <div class="d-flex bd-highlight text-white">
      <div class="me-auto p-2 bd-highlight">{{ t('message.G感度(-)') }}</div>
      <div class="p-2 bd-highlight">{{ t('message.G感度(+)') }}</div>
    </div>
    <Slider v-model="adjust_moving_average" :min="-5" :max="5" />
  </div>

  <GBowl
    v-if="isGBowl && isCircuit"
    :x="rotate_g_x"
    :y="rotate_g_y"
    :draw="true"
  />
  <GBowlTouge
    v-if="isGBowl && isTouge"
    :x="rotate_g_x"
    :y="rotate_g_y"
    :draw="true"
  />
  <GIndicator
    v-if="isGIndicator && isCircuit"
    :x="rotate_g_x"
    :y="rotate_g_y"
    :draw="true"
  />
  <GIndicatorTouge
    v-if="isGIndicator && isTouge"
    :x="rotate_g_x"
    :y="rotate_g_y"
    :draw="true"
  />

  <!-- モーダル表示エリア -->
  <div
    id="modalJobDetail"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header">
          <h5 class="modal-title">{{ t('message.キャリブレーション') }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- キャリブレーション1 -->
        <div v-show="!isCalibrated1">
          <div class="modal-body">
            <p>
              {{
                t(
                  'message.スマホをホルダーに固定した状態でGを計測するためのキャリブレーションを行います。'
                )
              }}
            </p>
            <p>
              {{
                t(
                  'message.スマホを地面と平行にした状態で車の進行方向に向けて「次へ」を押して下さい。'
                )
              }}
            </p>
            <img src="/calibration.jpg" alt="Logo" class="rounded img-fluid" />
          </div>
          <div class="modal-footer">
            <div class="w-50 m-0 pe-2">
              <button
                type="button"
                class="btn btn-success w-100"
                :disabled="!isLastSetting"
                @click="clickLastSetting"
              >
                {{ t('message.前回の設定を使う') }}
              </button>
            </div>

            <div class="w-50 m-0">
              <button
                type="button"
                class="btn btn-primary w-100"
                @click="cickCalibration1"
              >
                {{ t('message.次へ') }}
              </button>
            </div>
          </div>
        </div>
        <!-- キャリブレーション2 -->
        <div v-show="isCalibrated1 && !isCalibrated2">
          <div class="modal-body">
            <p>
              {{
                t('message.スマホをホルダーに固定して「次へ」を押して下さい。')
              }}
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary w-100"
              @click="cickCalibration2"
            >
              {{ t('message.次へ') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, watch, onMounted } from 'vue'
import {
  useAccelerationSensortKey,
  useAccelerationSensortType,
} from '@/libs/device/accelerationSensor'
import { useGyroSensortKey, useGyroSensortType } from '@/libs/device/gyroSensor'
import { rotate3dVector } from '@/libs/trigonometric'
import GBowl from '@/components/GBowl.vue'
import GBowlTouge from '@/components/GBowlTouge.vue'
import GIndicator from '@/components/GIndicator.vue'
import GIndicatorTouge from '@/components/GIndicatorTouge.vue'
import { Modal } from 'bootstrap'
import Slider from '@vueform/slider'
import { useI18n } from 'vue-i18n'
import { Keys } from '@/libs/localStorage'

export default defineComponent({
  components: {
    GBowl,
    GBowlTouge,
    GIndicator,
    GIndicatorTouge,
    Slider,
  },
  setup() {
    // i18n
    const { t } = useI18n({ useScope: 'global' })

    // ジャイロセンサーのモジュール
    const useGyroSensor = inject(useGyroSensortKey) as useGyroSensortType
    // ジャイロセンサーから取得できるリアルタイムな値
    const gyro_x = useGyroSensor.stateRefs.x
    const gyro_y = useGyroSensor.stateRefs.y
    const gyro_z = useGyroSensor.stateRefs.z
    let before_gyro_x = 0
    let before_gyro_y = 0
    let before_gyro_z = 0
    let after_gyro_x = 0
    let after_gyro_y = 0
    let after_gyro_z = 0

    // 加速度センサーのモジュール
    const useAccelerationSensor = inject(
      useAccelerationSensortKey
    ) as useAccelerationSensortType
    // 加速度から取得したリアルタイムな値
    const g_x = useAccelerationSensor.stateRefs.gX
    const g_y = useAccelerationSensor.stateRefs.gY
    const g_z = useAccelerationSensor.stateRefs.gZ
    // 回転したG
    const rotate_g_x = ref(0)
    const rotate_g_y = ref(0)
    // Gの感度調整用
    const adjust_moving_average =
      useAccelerationSensor.stateRefs.adjustMovingAverage

    const log: { time: number; x: number; y: number; z: number }[] = []
    let enabled_log = false

    // スマホで検出したGを車のGに変換する
    watch([g_z], () => {
      let timeStamp = 0
      if (enabled_log) {
        timeStamp = Math.round(new Date().getTime() / 1000)
      }

      const angle_x = after_gyro_x - before_gyro_x
      const angle_y = after_gyro_y - before_gyro_y
      const angle_z = Math.abs(before_gyro_z - after_gyro_z)
      let rotate_acceration = null

      const x = g_x.value
      const y = g_y.value
      const z = g_z.value
      rotate_acceration = rotate3dVector(x, y, z, angle_x, angle_y, angle_z)

      if (enabled_log) {
        log.push({
          time: timeStamp,
          x: rotate_acceration.x,
          y: rotate_acceration.y,
          z: rotate_acceration.z,
        })
      }

      rotate_g_x.value = rotate_acceration.x
      rotate_g_y.value = rotate_acceration.y
    })

    // 制御フラグ
    const isAccelerationSensor = useAccelerationSensor.stateRefs.isEnable
    const isGyroSensor = useGyroSensor.stateRefs.isEnable
    const isCalibrated1 = ref(false)
    const isCalibrated2 = ref(false)
    const isDriving = ref(false)
    const isGIndicator = ref(true)
    const isGBowl = ref(false)
    const isTouge = ref(true)
    const isCircuit = ref(false)
    const isLastSetting = ref(
      localStorage.getItem(Keys.beforeGyroX) !== null &&
        localStorage.getItem(Keys.beforeGyroY) !== null &&
        localStorage.getItem(Keys.beforeGyroZ) !== null &&
        localStorage.getItem(Keys.afterGyroX) !== null &&
        localStorage.getItem(Keys.afterGyroY) !== null &&
        localStorage.getItem(Keys.afterGyroZ) !== null
    )

    // 「キャリブレーション」押下
    const cickCalibration = () => {
      modalInfo.show()
    }

    // 車の加速度を計測する際の角度を計測する
    const cickCalibration1 = () => {
      before_gyro_x = gyro_x.value
      before_gyro_y = gyro_y.value
      before_gyro_z = gyro_z.value
      localStorage.setItem(Keys.beforeGyroX, String(before_gyro_x))
      localStorage.setItem(Keys.beforeGyroY, String(before_gyro_y))
      localStorage.setItem(Keys.beforeGyroZ, String(before_gyro_z))
      isCalibrated1.value = true
    }

    // スマホを固定しときの角度を記憶する
    const cickCalibration2 = () => {
      after_gyro_x = gyro_x.value
      after_gyro_y = gyro_y.value
      after_gyro_z = gyro_z.value
      localStorage.setItem(Keys.afterGyroX, String(after_gyro_x))
      localStorage.setItem(Keys.afterGyroY, String(after_gyro_y))
      localStorage.setItem(Keys.afterGyroZ, String(after_gyro_z))
      isCalibrated2.value = true
      modalInfo.hide()
      useGyroSensor.removeEvent()
      alert(t('message.キャリブレーションが完了しました。'))
    }

    // 「前回の設定を使用する」押下
    const clickLastSetting = () => {
      before_gyro_x = Number(localStorage.getItem(Keys.beforeGyroX))
      before_gyro_y = Number(localStorage.getItem(Keys.beforeGyroY))
      before_gyro_z = Number(localStorage.getItem(Keys.beforeGyroZ))
      after_gyro_x = Number(localStorage.getItem(Keys.afterGyroX))
      after_gyro_y = Number(localStorage.getItem(Keys.afterGyroY))
      after_gyro_z = Number(localStorage.getItem(Keys.afterGyroZ))
      isCalibrated1.value = true
      isCalibrated2.value = true
      modalInfo.hide()
      useGyroSensor.removeEvent()
      alert(t('message.キャリブレーションが完了しました。'))
    }

    // 「センサーを有効」押下
    const clickStartSensor = async () => {
      // 加速度センサーの有効化
      await useAccelerationSensor.enableSensor()
      // ジャイロセンサーの有効化
      await useGyroSensor.enableSensor()
      if (isAccelerationSensor.value && isGyroSensor.value) {
        alert(
          t(
            'message.センサーを有効にしました。スマホをホルダーで固定する場合は「キャリブレーション」を行って下さい。'
          )
        )
      }
    }

    // 「ドライビングスタート」押下
    const clickDrivingStart = () => {
      isDriving.value = true
    }

    /**
     * 「gbowl」押下
     */
    const clickGBowl = () => {
      isGBowl.value = true
      isGIndicator.value = false
    }

    /**
     * 「gindicator」押下
     */
    const clickGIndicator = () => {
      isGBowl.value = false
      isGIndicator.value = true
    }

    /**
     * 「MaxG:1.4」押下
     */
    const clickMaxG14 = () => {
      isTouge.value = false
      isCircuit.value = true
    }

    /**
     * 「MaxG:1.0」押下
     */
    const clickMaxG10 = () => {
      isTouge.value = true
      isCircuit.value = false
    }

    // 「ログダウンロード」押下
    const clickLogDownload = () => {
      const text = JSON.stringify(log)
      const fileName = 'test.txt'
      const blob = new Blob([text], { type: 'text/plain' })
      const aTag = document.createElement('a')
      aTag.href = URL.createObjectURL(blob)
      aTag.target = '_blank'
      aTag.download = fileName
      aTag.click()
      URL.revokeObjectURL(aTag.href)
    }

    let modalInfo = {} as Modal
    onMounted(() => {
      modalInfo = new Modal('#modalJobDetail', {
        keyboard: false,
      })
    })

    return {
      rotate_g_x,
      rotate_g_y,
      cickCalibration,
      cickCalibration1,
      cickCalibration2,
      clickLastSetting,
      clickDrivingStart,
      clickStartSensor,
      clickGIndicator,
      clickGBowl,
      clickLogDownload,
      clickMaxG14,
      clickMaxG10,
      isAccelerationSensor,
      isCalibrated1,
      isCalibrated2,
      isDriving,
      isGIndicator,
      isGBowl,
      isTouge,
      isCircuit,
      isLastSetting,
      adjust_moving_average,
      t,
    }
  },
})
</script>
