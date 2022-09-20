<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateQuestionnaireRequest;
use App\Models\QuestionnaireAnswer;
use Illuminate\Http\Response;
//use Illuminate\Support\Facades\Log;

// openapi
use App\OpenAPI;
use App\Libs\OpenAPIUtility;

use App\Service\Questionnaire\QuestionnaireService;

class QuestionnaireController extends Controller
{
    /**
     * アンケートの回答状態を取得する
     *
     * @return void
     */
    public function questionnaire_status(int $questionnaire_type)
    {
        $ip_address = $_SERVER['REMOTE_ADDR'];

        $questionnaire_service = new QuestionnaireService();
        $questionnaire_status = $questionnaire_service->get_questionnaire_status($questionnaire_type, $ip_address);


        $response_model = OpenAPIUtility::dicstionaryToModelContainer(
            OpenAPI\Model\ResponseQuestionnaireStatus::class,
            ['questionnaire_type' => $questionnaire_type, 'status' => $questionnaire_status]
        );

        return response()->json(
            $response_model,
            Response::HTTP_OK
        );
    }

    /**
     * アンケートの登録を行います。
     *
     * @return void
     */
    public function create(int $questionnaires_type, CreateQuestionnaireRequest $request)
    {
        $request_body = new OpenAPI\Model\RequestQuestionnaireCreate($request->all());
        $questionnaire_service = new QuestionnaireService();
        $ip_address = $_SERVER['REMOTE_ADDR'];
        $questionnaire_service->create_questionnaire_answer($questionnaires_type, $ip_address, $request_body->getJsonAnswer(), $request_body->getIsCanceld());
        return response()->json(
            [],
            Response::HTTP_CREATED
        );
    }
}
