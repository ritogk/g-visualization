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

import { exists, mapValues } from '../runtime';
/**
 * リクエスト アンケート登録
 * @export
 * @interface RequestQuestionnaireCreate
 */
export interface RequestQuestionnaireCreate {
    /**
     *  json形式の回答データ
     * @type {string}
     * @memberof RequestQuestionnaireCreate
     */
    jsonAnswer: string;
    /**
     * キャンセルフラグ
     * @type {boolean}
     * @memberof RequestQuestionnaireCreate
     */
    isCanceld: boolean;
}

export function RequestQuestionnaireCreateFromJSON(json: any): RequestQuestionnaireCreate {
    return RequestQuestionnaireCreateFromJSONTyped(json, false);
}

export function RequestQuestionnaireCreateFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestQuestionnaireCreate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'jsonAnswer': json['jsonAnswer'],
        'isCanceld': json['isCanceld'],
    };
}

export function RequestQuestionnaireCreateToJSON(value?: RequestQuestionnaireCreate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'jsonAnswer': value.jsonAnswer,
        'isCanceld': value.isCanceld,
    };
}
