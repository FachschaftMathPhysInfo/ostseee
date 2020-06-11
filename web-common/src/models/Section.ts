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
    Question,
    QuestionFromJSON,
    QuestionToJSON,
} from './index';

/**
 * 
 * @export
 * @interface Section
 */
export interface Section  {
    /**
     * 
     * @type {string}
     * @memberof Section
     */
    id?: string;
    /**
     * Map of translations for a given string. A string might contain markdown code.
     * @type {{ [key: string]: string; }}
     * @memberof Section
     */
    title: { [key: string]: string; };
    /**
     * 
     * @type {Array<Question>}
     * @memberof Section
     */
    questions: Array<Question>;
    /**
     * Used to determine position in array
     * @type {number}
     * @memberof Section
     */
    position?: number;
}

export function SectionFromJSON(json: any): Section {
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'title': json['title'],
        'questions': (json['questions'] as Array<any>).map(QuestionFromJSON),
        'position': !exists(json, 'position') ? undefined : json['position'],
    };
}

export function SectionToJSON(value?: Section): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'id': value.id,
        'title': value.title,
        'questions': (value.questions as Array<any>).map(QuestionToJSON),
        'position': value.position,
    };
}


