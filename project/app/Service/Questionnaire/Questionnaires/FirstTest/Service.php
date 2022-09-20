<?php

namespace App\Service\Questionnaire\Questionnaires\FirstTest;

use App\Models\QuestionnaireAnswer;
use App\Models\AccessLog;
use Carbon\Carbon;
use App\OpenAPI\Model;

// アンケート個別の処理
class Service
{
  /**
   * アンケートの回答状態を取得します。
   *
   * @param string $ip_address
   * @return int
   */
  public static function get_questionnaire_status(string $ip_address): int
  {
    $questionnaire_answer = QuestionnaireAnswer::where('sub_privary_key', $ip_address)
      ->where('questionnaire_type', Data::QUESTIONNAIRE_TYPE)
      ->first();
    // アンケートが回答済
    if ($questionnaire_answer != null) {
      return Model\QuestionnaireStatus::ANSWERED;
    }

    $now = new Carbon();
    if ($now->between(new Carbon(Data::PERIOD_START), new Carbon(Data::PERIOD_END))) {
    } else {
      // アンケート期間の範囲外
      return Model\QuestionnaireStatus::INELIGIBILITY;
    }

    // アンケートの非対象者
    $access_log = AccessLog::where('ip', $ip_address)->first();
    if ($access_log == null) {
      return Model\QuestionnaireStatus::INELIGIBILITY;
    }
    if ($access_log->access_cnt >= 10) {
    } else {
      return Model\QuestionnaireStatus::INELIGIBILITY;
    }

    return Model\QuestionnaireStatus::UNANSWERED;
  }
}
