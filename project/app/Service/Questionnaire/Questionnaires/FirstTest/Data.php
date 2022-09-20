<?php

namespace App\Service\Questionnaire\Questionnaires\FirstTest;

use \App\OpenAPI\Model\QuestionnaireType;
use Carbon\Carbon;

// アンケートの詳細情報
class Data
{
  public const QUESTIONNAIRE_TYPE = QuestionnaireType::FIRST_TEST;
  public const PERIOD_START = '2017-01-01 12:30:30';
  public const PERIOD_END = '2023-01-01 12:30:30';
}
