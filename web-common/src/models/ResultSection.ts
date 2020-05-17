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
import {
    Result,
    ResultFromJSON,
    ResultToJSON,
} from './index';

/**
 * 
 * @export
 * @interface ResultSection
 */
export interface ResultSection  {
    /**
     * 
     * @type {string}
     * @memberof ResultSection
     */
    id?: string;
    /**
     * Map of translations for a given string. A string might contain markdown code.
     * @type {{ [key: string]: string; }}
     * @memberof ResultSection
     */
    label?: { [key: string]: string; };
    /**
     * 
     * @type {Array<Result>}
     * @memberof ResultSection
     */
    results?: Array<Result>;
}

export function ResultSectionFromJSON(json: any): ResultSection {
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'label': !exists(json, 'label') ? undefined : json['label'],
        'results': !exists(json, 'results') ? undefined : (json['results'] as Array<any>).map(ResultFromJSON),
    };
}

export function ResultSectionToJSON(value?: ResultSection): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'id': value.id,
        'label': value.label,
        'results': value.results === undefined ? undefined : (value.results as Array<any>).map(ResultToJSON),
    };
}


