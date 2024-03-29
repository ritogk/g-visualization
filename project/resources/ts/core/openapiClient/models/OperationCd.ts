/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI Tutorial
 * OpenAPI Tutorial by halhorn
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * ■操作コード  
 * ENABLE_SENSOR: センサーを有効にする  
 * CALIBRATION: キャリブレーション  
 * CALIBRATION_BEFORE_SETTING: 直前設定を使う  
 * CALIBRATION_NEXT_1: キャリブレーション1 次へ  
 * CALIBRATION_NEXT_2: キャリブレーション2 次へ  
 * MAX_14_G: Max1.4G  
 * MAX_10_G: Max1.0G  
 * VOICE_OUTPUT_ON: 音声出力ON  
 * VOICE_OUTPUT_OFF: 音声出力OFF  
 * GBOWL: GBowl  
 * GINDICATOR: GIndicator
 * @export
 * @enum {string}
 */
export enum OperationCd {
    ENABLE_SENSOR = 1,
    CALIBRATION = 2,
    CALIBRATION_BEFORE_SETTING = 3,
    CALIBRATION_NEXT_1 = 4,
    CALIBRATION_NEXT_2 = 5,
    MAX_14_G = 6,
    MAX_10_G = 7,
    VOICE_OUTPUT_ON = 8,
    VOICE_OUTPUT_OFF = 9,
    GBOWL = 10,
    GINDICATOR = 11
}

export function OperationCdFromJSON(json: any): OperationCd {
    return OperationCdFromJSONTyped(json, false);
}

export function OperationCdFromJSONTyped(json: any, ignoreDiscriminator: boolean): OperationCd {
    return json as OperationCd;
}

export function OperationCdToJSON(value?: OperationCd | null): any {
    return value as any;
}

