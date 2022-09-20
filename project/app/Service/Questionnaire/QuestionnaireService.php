<?php

namespace App\Service\Questionnaire;

use App\Models\QuestionnaireAnswer;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
//use Illuminate\Support\Facades\Log;

// openapi
use App\OpenAPI;
use App\OpenAPI\Model\QuestionnaireType;
use App\OpenAPI\Model\QuestionnaireStatus;
//use App\Libs\OpenAPIUtility;

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
}
