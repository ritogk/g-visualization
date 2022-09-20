<template>
  <!-- モーダル -->
  <div
    id="modalQuestionnaireFirstTest"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header">
          <h5 class="modal-title">アンケートのお願い</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="clickCancel"
          ></button>
        </div>
        <!-- アンケート回答画面 -->
        <div v-if="pageNoRefs == PAGE_NO.QUESTIONNAIRE_ANSWER">
          <div class="modal-body">
            <p>
              今後より良いサービスを提供すべくためにアンケートを実施しております。
              お手数ではございますがご協力お願い致します。
            </p>
            <!-- 質問1 -->
            <div>
              <p class="mt-3">
                ■このアプリで運転中に新たな気付きが得られましたか?
              </p>
              <div class="form-check mb-2">
                <input
                  id="question1_1"
                  v-model="formRefs.question1"
                  class="form-check-input"
                  type="radio"
                  name="question"
                  value="5"
                  style="transform: scale(1.6)"
                />
                <label class="form-check-label" for="question1_1">
                  とてもそう思う
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  id="question1_2"
                  v-model="formRefs.question1"
                  class="form-check-input"
                  type="radio"
                  name="question"
                  value="4"
                  style="transform: scale(1.6)"
                />
                <label class="form-check-label" for="question1_2">
                  ややそう思う
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  id="question1_3"
                  v-model="formRefs.question1"
                  class="form-check-input"
                  type="radio"
                  name="question"
                  value="3"
                  style="transform: scale(1.6)"
                />
                <label class="form-check-label" for="question1_3">
                  どちらともいえない
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  id="question1_4"
                  v-model="formRefs.question1"
                  class="form-check-input"
                  type="radio"
                  name="question"
                  value="2"
                  style="transform: scale(1.6)"
                />
                <label class="form-check-label" for="question1_4">
                  あまりそう思わない
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  id="question1_5"
                  v-model="formRefs.question1"
                  class="form-check-input"
                  type="radio"
                  name="question"
                  value="1"
                  style="transform: scale(1.6)"
                />
                <label class="form-check-label" for="question1_5">
                  まったくそう思わない
                </label>
              </div>
            </div>
            <!-- 質問2 -->
            <div>
              <p class="mt-4">■アプリの操作は分かりやすいですか?</p>
              <div class="form-check mb-2">
                <input
                  id="question2_1"
                  v-model="formRefs.question2"
                  class="form-check-input"
                  type="radio"
                  name="question2"
                  value="5"
                  style="transform: scale(1.6)"
                />
                <label class="form-check-label" for="question2_1">
                  とてもそう思う
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  id="question2_2"
                  v-model="formRefs.question2"
                  class="form-check-input"
                  type="radio"
                  name="question2"
                  value="4"
                  style="transform: scale(1.6)"
                />
                <label class="form-check-label" for="question2_2">
                  ややそう思う
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  id="question2_3"
                  v-model="formRefs.question2"
                  class="form-check-input"
                  type="radio"
                  name="question2"
                  value="3"
                  style="transform: scale(1.6)"
                />
                <label class="form-check-label" for="question2_3">
                  どちらともいえない
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  id="question2_4"
                  v-model="formRefs.question2"
                  class="form-check-input"
                  type="radio"
                  name="question2"
                  value="2"
                  style="transform: scale(1.6)"
                />
                <label class="form-check-label" for="question2_4">
                  あまりそう思わない
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  id="question2_5"
                  v-model="formRefs.question2"
                  class="form-check-input"
                  type="radio"
                  name="question2"
                  value="1"
                  style="transform: scale(1.6)"
                />
                <label class="form-check-label" for="question2_5">
                  まったくそう思わない
                </label>
              </div>
            </div>
            <!-- 質問3 -->
            <div>
              <p class="mt-4">
                ■もし何かご要望がありましたらご自由にお書きください。
              </p>
              <div class="form-floating">
                <textarea
                  id="floatingTextarea2"
                  v-model="formRefs.question3"
                  class="form-control"
                  placeholder="Leave a comment here"
                  style="height: 100px"
                ></textarea>
                <label for="floatingTextarea2" class="text-muted"
                  >こんな機能がほしい! もっとこうしてほしい!</label
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="w-100 m-0">
              <button
                type="button"
                class="btn btn-success w-100"
                @click="clickSend"
              >
                アンケートを送信する
              </button>
            </div>
          </div>
        </div>
        <!-- アンケート回答後の画面 -->
        <div v-if="pageNoRefs == PAGE_NO.COMPLETE">
          <div class="modal-body">
            <p>アンケートにご協力いただきありがとうございました。</p>
            <div class="modal-footer">
              <div class="w-100 m-0">
                <button
                  type="button"
                  class="btn btn-secondary w-100"
                  @click="clickClose"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch, ref, inject } from 'vue'
import { Modal } from 'bootstrap'
import { useI18n } from 'vue-i18n'
import { Questionnaire } from '@/libs/questionnaire'
import { QuestionnaireType } from '@/openapi/models'
import {
  useQuestionnaireStateKey,
  useQuestionnaireStateType,
} from '@/libs/questionnaireModalState'

export default defineComponent({
  setup() {
    // アンケートポップアップの状態
    const useQuestionnaireState = inject(
      useQuestionnaireStateKey
    ) as useQuestionnaireStateType

    // 表示、非表示制御
    const isShowRef = useQuestionnaireState.stateRefs.isShow
    const questionnaireTypeRef =
      useQuestionnaireState.stateRefs.questionnaireType
    watch([isShowRef, questionnaireTypeRef], () => {
      if (
        isShowRef.value &&
        questionnaireTypeRef.value === QuestionnaireType.FIRST_TEST
      ) {
        modalInfo.show()
      } else {
        modalInfo.hide()
      }
    })

    // i18n
    const { t } = useI18n({ useScope: 'global' })

    // formの状態
    const formRefs = reactive({
      question1: '3',
      question2: '3',
      question3: '',
    })

    enum PAGE_NO {
      QUESTIONNAIRE_ANSWER,
      COMPLETE,
    }
    const pageNoRefs = ref(PAGE_NO.QUESTIONNAIRE_ANSWER)

    const questionnaire = new Questionnaire()
    /**
     * 「閉じる」押下
     */
    const clickClose = () => {
      useQuestionnaireState.hide()
      modalInfo.hide()
    }

    /**
     * 「キャンセル」押下
     */
    const clickCancel = () => {
      questionnaire.create_questionnaire_answer(
        QuestionnaireType.FIRST_TEST,
        '{}',
        true
      )
      useQuestionnaireState.hide()
      modalInfo.hide()
    }

    /**
     * 「アンケートを送信する」押下
     */
    const clickSend = () => {
      const jsonAnswer = JSON.stringify({
        question1: Number(formRefs.question1),
        question2: Number(formRefs.question2),
        question3: formRefs.question3,
      })
      questionnaire.create_questionnaire_answer(
        QuestionnaireType.FIRST_TEST,
        jsonAnswer,
        false
      )
      pageNoRefs.value = PAGE_NO.COMPLETE
      // useQuestionnaireState.hide()
      // modalInfo.hide()
    }

    // モーダル初期設定
    let modalInfo = {} as Modal
    onMounted(() => {
      modalInfo = new Modal('#modalQuestionnaireFirstTest', {
        keyboard: false,
        backdrop: 'static',
      })
    })

    return {
      clickClose,
      clickSend,
      clickCancel,
      formRefs,
      pageNoRefs,
      PAGE_NO,
      t,
    }
  },
})
</script>
