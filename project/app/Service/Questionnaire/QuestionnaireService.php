<?php

namespace App\Service\Questionnaire;

use App\Http\Controllers\Controller;
use App\Models\QuestionnaireAnswer;
//use Illuminate\Support\Facades\Log;

// openapi
use App\OpenAPI\Model\QuestionnaireType;
use App\OpenAPI\Model\QuestionnaireStatus;

/**
 * アンケートのサービスクラス
 */
class QuestionnaireService extends Controller
{
    /**
     * 指定アンケートの回答状態を取得する
     *
     * @param integer $questionnaire_type
     * @return int
     */
    public function get_questionnaire_status(int $questionnaire_type, string $ip_address): int
    {
        switch ($questionnaire_type) {
            case QuestionnaireType::FIRST_TEST:
                return Questionnaires\FirstTest\Service::get_questionnaire_status($ip_address);
                break;
            default:
                break;
        }
        return QuestionnaireStatus::INELIGIBILITY;
    }

    /**
     * アンケート回答の登録を行います。
     *
     * @param integer $questionnaire_type
     * @param string $sub_key
     * @param string $json_answer
     * @param boolean $is_canceld
     * @return void
     */
    public function create_questionnaire_answer(int $questionnaire_type, string $sub_key, string $json_answer, bool $is_canceld): void
    {
        // 同じ回答は登録させない。
        if (QuestionnaireAnswer::where('questionnaire_type', $questionnaire_type)->where('sub_key', $sub_key)->get()->isEmpty()) {
            QuestionnaireAnswer::create(['questionnaire_type' => $questionnaire_type, 'sub_key' => $sub_key, 'is_canceled' => $is_canceld, 'json_answer' => $json_answer]);
        }
    }
}
