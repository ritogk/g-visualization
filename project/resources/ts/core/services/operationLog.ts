import { apiConfig } from '@/core/openapi'
import { LogApi } from '@/core/openapiClient/apis/LogApi'
import { OperationCd } from '@/core/openapiClient/models'
/**
 * 操作ログに関するクラス
 */
class operationLog {
  private logAPi = new LogApi(apiConfig)
  /**
   * コンストラクタ
   */
  constructor() {}

  /**
   * 操作ログ送信
   * @param operationCd
   */
  send(operationCd: OperationCd): void {
    this.logAPi.logOperationPost({
      requestOperationLog: { operationCd: operationCd },
    })
  }
}

export { operationLog }
