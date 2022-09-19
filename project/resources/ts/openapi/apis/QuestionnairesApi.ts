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


import * as runtime from '../runtime';
import {
    ResponseItemQuestionnaireStatus,
    ResponseItemQuestionnaireStatusFromJSON,
    ResponseItemQuestionnaireStatusToJSON,
} from '../models';

/**
 * QuestionnairesApi - interface
 * 
 * @export
 * @interface QuestionnairesApiInterface
 */
export interface QuestionnairesApiInterface {
    /**
     * 詳細内容
     * @summary アンケートの回答状態を取得します。
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QuestionnairesApiInterface
     */
    questionnairesStatusGetRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ResponseItemQuestionnaireStatus>>>;

    /**
     * 詳細内容
     * アンケートの回答状態を取得します。
     */
    questionnairesStatusGet(initOverrides?: RequestInit): Promise<Array<ResponseItemQuestionnaireStatus>>;

}

/**
 * 
 */
export class QuestionnairesApi extends runtime.BaseAPI implements QuestionnairesApiInterface {

    /**
     * 詳細内容
     * アンケートの回答状態を取得します。
     */
    async questionnairesStatusGetRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ResponseItemQuestionnaireStatus>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/questionnaires/status`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ResponseItemQuestionnaireStatusFromJSON));
    }

    /**
     * 詳細内容
     * アンケートの回答状態を取得します。
     */
    async questionnairesStatusGet(initOverrides?: RequestInit): Promise<Array<ResponseItemQuestionnaireStatus>> {
        const response = await this.questionnairesStatusGetRaw(initOverrides);
        return await response.value();
    }

}
