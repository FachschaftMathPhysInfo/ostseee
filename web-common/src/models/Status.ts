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
    StatusCounts,
    StatusCountsFromJSON,
    StatusCountsToJSON,
    StatusSysstats,
    StatusSysstatsFromJSON,
    StatusSysstatsToJSON,
} from './index';

/**
 * 
 * @export
 * @interface Status
 */
export interface Status  {
    /**
     * 
     * @type {Date}
     * @memberof Status
     */
    generated?: Date;
    /**
     * 
     * @type {StatusCounts}
     * @memberof Status
     */
    counts?: StatusCounts;
    /**
     * 
     * @type {StatusSysstats}
     * @memberof Status
     */
    sysstats?: StatusSysstats;
}

export function StatusFromJSON(json: any): Status {
    return {
        'generated': !exists(json, 'generated') ? undefined : new Date(json['generated']),
        'counts': !exists(json, 'counts') ? undefined : StatusCountsFromJSON(json['counts']),
        'sysstats': !exists(json, 'sysstats') ? undefined : StatusSysstatsFromJSON(json['sysstats']),
    };
}

export function StatusToJSON(value?: Status): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'generated': value.generated === undefined ? undefined : value.generated.toISOString(),
        'counts': StatusCountsToJSON(value.counts),
        'sysstats': StatusSysstatsToJSON(value.sysstats),
    };
}


