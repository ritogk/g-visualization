import { InjectionKey, reactive, ToRefs, toRefs } from 'vue'
// import { Device } from '@/libs/constants'
import { QuestionnaireType } from '@/openapi/models'
// import { Questionnaire } from './questionnaire'

/**
 * アンケートポップアップの状態に関するクラス
 **/

type useQuestionnaireStateType = {
  stateRefs: ToRefs<{ isShow: Boolean; questionnaireType: QuestionnaireType }>
  setQuestionnaireType(questionnaireType: QuestionnaireType): void
  show(): void
  hide(): void
}

const useQuestionnaireState = (): useQuestionnaireStateType => {
  // 状態
  const state = reactive({
    isShow: false,
    questionnaireType: QuestionnaireType.FIRST_TEST,
  })

  /**
   * アンケート種別をセットします。
   * @param questionnaireType
   */
  const setQuestionnaireType = (questionnaireType: QuestionnaireType) => {
    state.questionnaireType = questionnaireType
  }

  /**
   * ポップアップ表示
   */
  const show = () => {
    state.isShow = true
  }

  /**
   * ポップアップ非表示
   */
  const hide = () => {
    state.isShow = false
  }

  return {
    stateRefs: toRefs(state),
    setQuestionnaireType: setQuestionnaireType,
    show: show,
    hide: hide,
  }
}

const useQuestionnaireStateKey: InjectionKey<useQuestionnaireStateType> =
  Symbol('useQuestionnaireState')

export {
  useQuestionnaireState,
  useQuestionnaireStateType,
  useQuestionnaireStateKey,
}
