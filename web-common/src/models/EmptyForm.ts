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
    AbstractForm,
    AbstractFormFromJSON,
    AbstractFormToJSON,
    Course,
    CourseFromJSON,
    CourseToJSON,
    Prof,
    ProfFromJSON,
    ProfToJSON,
    Tutor,
    TutorFromJSON,
    TutorToJSON,
} from './index';

/**
 * Empty Form to be completed by student.
 * @export
 * @interface EmptyForm
 */
export interface EmptyForm  {
    /**
     * 
     * @type {string}
     * @memberof EmptyForm
     */
    id?: string;
    /**
     * Name of the module evaluated.
     * @type {string}
     * @memberof EmptyForm
     */
    moduleName?: string;
    /**
     * 
     * @type {Array<Prof>}
     * @memberof EmptyForm
     */
    profs?: Array<Prof>;
    /**
     * 
     * @type {Array<Tutor>}
     * @memberof EmptyForm
     */
    tutors?: Array<Tutor>;
    /**
     * 
     * @type {AbstractForm}
     * @memberof EmptyForm
     */
    abstractForm?: AbstractForm;
    /**
     * 
     * @type {Course}
     * @memberof EmptyForm
     */
    course?: Course;
}

export function EmptyFormFromJSON(json: any): EmptyForm {
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'moduleName': !exists(json, 'moduleName') ? undefined : json['moduleName'],
        'profs': !exists(json, 'profs') ? undefined : (json['profs'] as Array<any>).map(ProfFromJSON),
        'tutors': !exists(json, 'tutors') ? undefined : (json['tutors'] as Array<any>).map(TutorFromJSON),
        'abstractForm': !exists(json, 'abstractForm') ? undefined : AbstractFormFromJSON(json['abstractForm']),
        'course': !exists(json, 'course') ? undefined : CourseFromJSON(json['course']),
    };
}

export function EmptyFormToJSON(value?: EmptyForm): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'id': value.id,
        'moduleName': value.moduleName,
        'profs': value.profs === undefined ? undefined : (value.profs as Array<any>).map(ProfToJSON),
        'tutors': value.tutors === undefined ? undefined : (value.tutors as Array<any>).map(TutorToJSON),
        'abstractForm': AbstractFormToJSON(value.abstractForm),
        'course': CourseToJSON(value.course),
    };
}


