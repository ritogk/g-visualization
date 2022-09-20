<?php

namespace App\Service\Questionnaire\Questionnaires\FirstTest;

use \App\OpenAPI\Model\QuestionnaireType;
use Carbon\Carbon;

// アンケートの詳細情報
class Data
{
  private const QUESTIONNAIRE_TYPE = QuestionnaireType::FIRST_TEST;
  private const PERIOD_START = '2017-01-01 12:30:30';
  private const PERIOD_END = '2023-01-01 12:30:30';

  static function get_questionnaire_type(): int
  {
    return self::QUESTIONNAIRE_TYPE;
  }

  static function get_period_start(): Carbon
  {
    return new Carbon(self::PERIOD_START);
  }

  static function get_period_end(): Carbon
  {
    return new Carbon(self::PERIOD_END);
  }
}
