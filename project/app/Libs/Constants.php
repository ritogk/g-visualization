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
    // 「キャリブレーション1 次へ」
    const OPERATION_CD_CALIBRATION_NEXT_1 = 4;
    // 「キャリブレーション2 次へ」
    const OPERATION_CD_CALIBRATION_NEXT_2 = 5;
    // 「Max1.4G」
    const OPERATION_CD_MAX_14_G = 6;
    // 「Max1.0G」
    const OPERATION_CD_MAX_10_G = 7;
    // 「音声出力ON」
    const OPERATION_CD_VOICE_OUTPUT_ON = 8;
    // 「音声出力OFF」
    const OPERATION_CD_VOICE_OUTPUT_OFF = 9;
    // 「GBowl」
    const OPERATION_CD_GBOWL = 10;
    // 「GIndicator」
    const OPERATION_CD_GINDICATOR = 11;
}
