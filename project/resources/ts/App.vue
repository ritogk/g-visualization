<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="me-auto">
        <div class="row">
          <div class="col">
            <a class="navbar-brand pb-0" href="#" @click="clickHeader"
              >GVisual</a
            >
          </div>
        </div>
        <div class="row">
          <div class="col text-light" style="font-size: 8px">
            {{ t('message.スポーツ走行に特化したGの可視化アプリ') }}
          </div>
        </div>
      </div>
      <div>
        <img
          src="/lp/img/flags/Japan.png"
          width="24"
          height="24"
          @click="clickChangeLang(Lang.ja)"
        />
      </div>
      <div>
        <img
          src="/lp/img/flags/United-States.png"
          @click="clickChangeLang(Lang.en)"
        />
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavDropdown" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" @click="clickInquiry">{{
              t('message.お問い合わせ')
            }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="clickThisApp">{{
              t('message.このアプリについて')
            }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
  <QuestionnaireArea></QuestionnaireArea>
</template>

<script lang="ts">
import { defineComponent, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import QuestionnaireArea from '@/core/components/questionnaire/QuestionnaireArea.vue'
import { useDevice, useDeviceKey } from '@/core/services/device/device'
import {
  useGyroSensor,
  useGyroSensortKey,
} from '@/core/services/device/gyroSensor'
import {
  useAccelerationSensor,
  useAccelerationSensortKey,
} from '@/core/services/device/accelerationSensor'
import { Device, Lang } from '@/core/constants'
import NoSleep from 'nosleep.js'
import { useI18n } from 'vue-i18n'
import { Questionnaire } from '@/core/services/questionnaire'
import { QuestionnaireStatus } from '@/core/openapiClient/models'
import {
  useQuestionnaireState,
  useQuestionnaireStateKey,
} from '@/core/components/questionnaire/questionnaireState'
import { QuestionnaireType } from '@/core/openapiClient/models'

export default defineComponent({
  components: {
    QuestionnaireArea,
  },
  setup() {
    // i18n
    const { t, locale } = useI18n()

    // 端末情報
    const device = useDevice()
    provide(useDeviceKey, device)
    device.setDevice()

    // ジャイロセンサー
    const gyroSensor = useGyroSensor(device.stateRefs.device.value)
    provide(useGyroSensortKey, gyroSensor)

    // 加速度センサー
    const accelerationSensor = useAccelerationSensor(
      device.stateRefs.device.value
    )
    provide(useAccelerationSensortKey, accelerationSensor)

    // スリープを防ぐ
    var noSleep = new NoSleep()
    window.addEventListener(
      'click',
      function enableNoSleep() {
        document.removeEventListener('click', enableNoSleep, false)
        noSleep.enable()
      },
      false
    )

    // アンケートポップアップ
    const questionnaireState = useQuestionnaireState()
    provide(useQuestionnaireStateKey, questionnaireState)

    // 初回 アンケート表示制御
    const questionnaire = new Questionnaire()
    questionnaire
      .get_questionnaire_status(QuestionnaireType.FIRST_TEST)
      .then((value) => {
        if (value == QuestionnaireStatus.UNANSWERED) {
          questionnaireState.setQuestionnaireType(QuestionnaireType.FIRST_TEST)
          questionnaireState.show()
          console.log(questionnaireState.stateRefs.isShow.value)
          console.log(questionnaireState.stateRefs.questionnaireType.value)
        }
      })

    onMounted(() => {
      // 端末がiphoneでない場合は警告文を表示
      if (device.stateRefs.device.value === Device.pc) {
        alert(t('message.このアプリはスマホ専用です。'))
      }
    })

    const router = useRouter()
    // 「お問い合わせ」クリックイベント
    const clickInquiry = () => {
      location.href = 'https://twitter.com/homing_fd2'
    }

    // 「このアプリについて」押下
    const clickThisApp = () => {
      location.href = `/lp/${locale.value}`
    }

    // 「ヘッダー」クリックイベント
    const clickHeader = () => {
      router.push({ name: 'index' })
    }

    // 言語変更
    const clickChangeLang = (lang: Lang) => {
      locale.value = lang
    }

    return { clickInquiry, clickHeader, clickChangeLang, clickThisApp, Lang, t }
  },
})
</script>
