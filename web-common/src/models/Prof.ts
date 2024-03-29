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
 * @interface Prof
 */
export interface Prof  {
    /**
     * 
     * @type {string}
     * @memberof Prof
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Prof
     */
    firstname: string;
    /**
     * 
     * @type {string}
     * @memberof Prof
     */
    lastname: string;
    /**
     * 
     * @type {string}
     * @memberof Prof
     */
    title: string;
    /**
     * Determines, whether public reports can include, this persons results.
     * @type {boolean}
     * @memberof Prof
     */
    censored: boolean;
    /**
     * Date of agreement that results can be published
     * @type {Date}
     * @memberof Prof
     */
    censoredDate: Date;
    /**
     * Used to communicate to prof.
     * @type {string}
     * @memberof Prof
     */
    email: string;
}

export function ProfFromJSON(json: any): Prof {
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'firstname': json['firstname'],
        'lastname': json['lastname'],
        'title': json['title'],
        'censored': json['censored'],
        'censoredDate': new Date(json['censoredDate']),
        'email': json['email'],
    };
}

export function ProfToJSON(value?: Prof): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'id': value.id,
        'firstname': value.firstname,
        'lastname': value.lastname,
        'title': value.title,
        'censored': value.censored,
        'censoredDate': value.censoredDate.toISOString().substr(0,10),
        'email': value.email,
    };
}


