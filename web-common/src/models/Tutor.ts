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
 * Subteacher, only sees portions of the results of his course. Currently they are created for every year newly.
 * @export
 * @interface Tutor
 */
export interface Tutor  {
    /**
     * 
     * @type {string}
     * @memberof Tutor
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Tutor
     */
    name: string;
    /**
     * Determines, whether public reports can include, this persons results.
     * @type {boolean}
     * @memberof Tutor
     */
    censored: boolean;
    /**
     * Date of agreement that results can be published
     * @type {Date}
     * @memberof Tutor
     */
    censoredDate: Date;
    /**
     * Third-party Key, that identifies a tutor.
     * @type {string}
     * @memberof Tutor
     */
    thirdPartyKey?: string;
    /**
     * 
     * @type {string}
     * @memberof Tutor
     */
    email: string;
}

export function TutorFromJSON(json: any): Tutor {
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': json['name'],
        'censored': json['censored'],
        'censoredDate': new Date(json['censoredDate']),
        'thirdPartyKey': !exists(json, 'thirdPartyKey') ? undefined : json['thirdPartyKey'],
        'email': json['email'],
    };
}

export function TutorToJSON(value?: Tutor): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'id': value.id,
        'name': value.name,
        'censored': value.censored,
        'censoredDate': value.censoredDate.toISOString().substr(0,10),
        'thirdPartyKey': value.thirdPartyKey,
        'email': value.email,
    };
}


