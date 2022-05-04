<template>
  <button
    :disabled="isEnabledSensor"
    type="button"
    class="btn btn-success w-100 mb-1"
    @click="clickStartSensor()"
  >
    ①センサーを有効にする</button
  ><br />
  <button
    type="button"
    class="btn btn-primary w-100 mb-1"
    :disabled="!isEnabledSensor || isCalibrated1 || isCalibrated2"
    @click="cickCalibration()"
  >
    ②キャリブレーション
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

  <div class="row">
    <div class="col-6">
      <button
        type="button"
        class="btn btn-secondary w-100"
        :class="{
          active: isGBowl,
        }"
        @click="clickGBowl"
      >
        GBowl
      </button>
    </div>
    <div class="col-6">
      <button
        type="button"
        class="btn btn-secondary w-100"
        :class="{
          active: isGIndicator,
        }"
        @click="clickGIndicator"
      >
        GIndicator
      </button>
    </div>
  </div>
  <br />

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
          <h5 class="modal-title">キャリブレーション</h5>
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
              スマホをホルダーで固定した状態でGを計測するためのキャリブレーションを行います。
            </p>
            <p>
              スマホを地面と平行にした状態で車の進行方向に向けて「確定」を押して下さい。
            </p>
            <img src="/calibration.jpg" alt="Logo" class="rounded img-fluid" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary w-100"
              @click="cickCalibration1"
            >
              確定
            </button>
          </div>
        </div>
        <!-- キャリブレーション2 -->
        <div v-show="isCalibrated1 && !isCalibrated2">
          <div class="modal-body">
            <p>スマホをホルダーに固定して「確定」を押して下さい。</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary w-100"
              @click="cickCalibration2"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <GBowl v-if="isGBowl" :x="rotate_g_x" :y="rotate_g_y" :draw="true" />
  <GIndicator
    v-if="isGIndicator"
    :x="rotate_g_x"
    :y="rotate_g_y"
    :draw="true"
  />
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
import GIndicator from '@/components/GIndicator.vue'
import { Modal } from 'bootstrap'

export default defineComponent({
  components: {
    GBowl,
    GIndicator,
  },
  setup() {
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
    // スマホで検出したGを車のGに変換する
    watch([g_x, g_y, g_z], () => {
      const angle_x = after_gyro_x - before_gyro_x
      const angle_y = after_gyro_y - before_gyro_y
      const angle_z = Math.abs(before_gyro_z - after_gyro_z)
      let rotate_acceration = null
      rotate_acceration = rotate3dVector(
        g_x.value,
        g_y.value,
        g_z.value,
        angle_x,
        angle_y,
        angle_z
      )

      rotate_g_x.value = rotate_acceration.x
      rotate_g_y.value = rotate_acceration.y
    })

    // 画面の制御フラグ
    const isEnabledSensor = useAccelerationSensor.stateRefs.isEnable
    const isCalibrated1 = ref(false)
    const isCalibrated2 = ref(false)
    const isDriving = ref(false)
    const isGIndicator = ref(true)
    const isGBowl = ref(false)

    // 「キャリブレーション」押下
    const cickCalibration = () => {
      modalInfo.show()
    }

    // 車の加速度を計測する際の角度を計測する
    const cickCalibration1 = () => {
      before_gyro_x = gyro_x.value
      before_gyro_y = gyro_y.value
      before_gyro_z = gyro_z.value
      isCalibrated1.value = true
    }

    // スマホを固定しときの角度を記憶する
    const cickCalibration2 = () => {
      after_gyro_x = gyro_x.value
      after_gyro_y = gyro_y.value
      after_gyro_z = gyro_z.value
      isCalibrated2.value = true
      modalInfo.hide()
      alert('キャリブレーションが完了しました。')
    }

    // 「センサーを有効」押下
    const clickStartSensor = () => {
      // 加速度センサーの有効化
      useAccelerationSensor.enableSensor()
      // ジャイロセンサーの有効化
      useGyroSensor.enableSensor()
      alert(
        'センサーを有効にしました。\nスマホをホルダーで固定する場合は「キャリブレーション」を行って下さい。'
      )
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
      clickDrivingStart,
      clickStartSensor,
      clickGIndicator,
      clickGBowl,
      isEnabledSensor,
      isCalibrated1,
      isCalibrated2,
      isDriving,
      isGIndicator,
      isGBowl,
    }
  },
})
</script>
