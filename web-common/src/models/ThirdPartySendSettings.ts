// tslint:disable
/**
 * Evaluation
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ThirdPartySendSettings
 */
export interface ThirdPartySendSettings  {
    /**
     * 
     * @type {string}
     * @memberof ThirdPartySendSettings
     */
    begin?: string;
    /**
     * 
     * @type {string}
     * @memberof ThirdPartySendSettings
     */
    end?: string;
    /**
     * The URl of the Plattform to be contacted
     * @type {string}
     * @memberof ThirdPartySendSettings
     */
    plattformUrl?: string;
    /**
     * The URl of the the eval system, should end with /
     * @type {string}
     * @memberof ThirdPartySendSettings
     */
    baseUrl?: string;
    /**
     * non zero values are meant to force
     * @type {number}
     * @memberof ThirdPartySendSettings
     */
    force?: number;
}

export function ThirdPartySendSettingsFromJSON(json: any): ThirdPartySendSettings {
    return {
        'begin': !exists(json, 'begin') ? undefined : json['begin'],
        'end': !exists(json, 'end') ? undefined : json['end'],
        'plattformUrl': !exists(json, 'plattformUrl') ? undefined : json['plattformUrl'],
        'baseUrl': !exists(json, 'baseUrl') ? undefined : json['baseUrl'],
        'force': !exists(json, 'force') ? undefined : json['force'],
    };
}

export function ThirdPartySendSettingsToJSON(value?: ThirdPartySendSettings): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'begin': value.begin,
        'end': value.end,
        'plattformUrl': value.plattformUrl,
        'baseUrl': value.baseUrl,
        'force': value.force,
    };
}


