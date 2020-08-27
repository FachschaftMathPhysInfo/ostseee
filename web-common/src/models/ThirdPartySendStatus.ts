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
 * @interface ThirdPartySendStatus
 */
export interface ThirdPartySendStatus  {
    /**
     * 
     * @type {number}
     * @memberof ThirdPartySendStatus
     */
    errno?: number;
    /**
     * 
     * @type {number}
     * @memberof ThirdPartySendStatus
     */
    vid?: number;
    /**
     * 
     * @type {number}
     * @memberof ThirdPartySendStatus
     */
    participants?: number;
    /**
     * 
     * @type {number}
     * @memberof ThirdPartySendStatus
     */
    assigned?: number;
    /**
     * 
     * @type {number}
     * @memberof ThirdPartySendStatus
     */
    overwritten?: number;
    /**
     * 
     * @type {number}
     * @memberof ThirdPartySendStatus
     */
    notchanged?: number;
}

export function ThirdPartySendStatusFromJSON(json: any): ThirdPartySendStatus {
    return {
        'errno': !exists(json, 'errno') ? undefined : json['errno'],
        'vid': !exists(json, 'vid') ? undefined : json['vid'],
        'participants': !exists(json, 'participants') ? undefined : json['participants'],
        'assigned': !exists(json, 'assigned') ? undefined : json['assigned'],
        'overwritten': !exists(json, 'overwritten') ? undefined : json['overwritten'],
        'notchanged': !exists(json, 'notchanged') ? undefined : json['notchanged'],
    };
}

export function ThirdPartySendStatusToJSON(value?: ThirdPartySendStatus): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'errno': value.errno,
        'vid': value.vid,
        'participants': value.participants,
        'assigned': value.assigned,
        'overwritten': value.overwritten,
        'notchanged': value.notchanged,
    };
}


