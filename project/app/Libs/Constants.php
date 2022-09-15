<?php

namespace App\Libs;

/**
 * 定数
 */
class Constants
{
    // 「センサーを有効にする」
    const OPERATION_CD_ENABLE_SENSOR = 1;
    // 「キャリブレーション」
    const OPERATION_CD_CALIBRATION = 2;
    // 「直前設定を使う」
    const OPERATION_CD_CALIBRATION_BEFORE_SETTING = 3;
    // 「Max1.4G」
    const OPERATION_CD_MAX_14_G = 4;
    // 「Max1.0G」
    const OPERATION_CD_MAX_10_G = 5;
    // 「音声出力ON」
    const OPERATION_CD_VOICE_OUTPUT_ON = 6;
    // 「音声出力OFF」
    const OPERATION_CD_VOICE_OUTPUT_OFF = 7;
    // 「GBowl」
    const OPERATION_CD_GBOWL = 8;
    // 「GIndicator」
    const OPERATION_CD_GINDICATOR = 9;
}
