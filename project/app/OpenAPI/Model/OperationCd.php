<?php
/**
 * OperationCd
 *
 * PHP version 7.4
 *
 * @category Class
 * @package  App\OpenAPI
 * @author   OpenAPI Generator team
 * @link     https://openapi-generator.tech
 */

/**
 * OpenAPI Tutorial
 *
 * OpenAPI Tutorial by halhorn
 *
 * The version of the OpenAPI document: 0.0.0
 * Generated by: https://openapi-generator.tech
 * OpenAPI Generator version: 6.1.1-SNAPSHOT
 */

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

namespace App\OpenAPI\Model;
use \App\OpenAPI\ObjectSerializer;

/**
 * OperationCd Class Doc Comment
 *
 * @category Class
 * @description 操作コード
 * @package  App\OpenAPI
 * @author   OpenAPI Generator team
 * @link     https://openapi-generator.tech
 */
class OperationCd
{
    /**
     * Possible values of this enum
     */
    public const ENABLE_SENSOR = 1;

    public const CALIBRATION = 2;

    public const CALIBRATION_BEFORE_SETTING = 3;

    public const CALIBRATION_NEXT_1 = 4;

    public const CALIBRATION_NEXT_2 = 5;

    public const MAX_14_G = 6;

    public const MAX_10_G = 7;

    public const VOICE_OUTPUT_ON = 8;

    public const VOICE_OUTPUT_OFF = 9;

    public const GBOWL = 10;

    public const GINDICATOR = 11;

    /**
     * Gets allowable values of the enum
     * @return string[]
     */
    public static function getAllowableEnumValues()
    {
        return [
            self::ENABLE_SENSOR,
            self::CALIBRATION,
            self::CALIBRATION_BEFORE_SETTING,
            self::CALIBRATION_NEXT_1,
            self::CALIBRATION_NEXT_2,
            self::MAX_14_G,
            self::MAX_10_G,
            self::VOICE_OUTPUT_ON,
            self::VOICE_OUTPUT_OFF,
            self::GBOWL,
            self::GINDICATOR
        ];
    }
}


