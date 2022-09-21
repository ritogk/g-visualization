import { QuestionnairesApi } from '@/core/openapiClient/apis'
import { apiConfig } from '@/core/openapi'
import {
  QuestionnaireType,
  QuestionnaireStatus,
} from '@/core/openapiClient/models'
/**
 * アンケートに関するクラス
 */
class Questionnaire {
  private questionnairesApi = new QuestionnairesApi(apiConfig)
  /**
   * コンストラクタ
   */
  constructor() {}

  /**
   * 特定のアンケートの回答状態を取得します。
   * @param questionnaireType
   * @return QuestionnaireStatus
   */
  async get_questionnaire_status(
    questionnaireType: QuestionnaireType
  ): Promise<QuestionnaireStatus> {
    const response =
      await this.questionnairesApi.questionnairesQuestionnairesTypeStatusGet({
        questionnairesType: questionnaireType,
      })
    return response.status
  }

  /**
   * アンケート回答の登録を行います。
   * @param questionnaireType
   * @param jsonAnswer
   * @param isCanceld
   * @returns
   */
  async create_questionnaire_answer(
    questionnaireType: QuestionnaireType,
    jsonAnswer: string,
    isCanceld: boolean
  ): Promise<void> {
    await this.questionnairesApi.questionnairesQuestionnairesTypePost({
      questionnairesType: questionnaireType,
      requestQuestionnaireCreate: {
        jsonAnswer: jsonAnswer,
        isCanceld: isCanceld,
      },
    })
    return
  }
}

export { Questionnaire }
