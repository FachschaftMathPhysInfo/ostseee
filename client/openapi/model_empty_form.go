/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi
// EmptyForm Empty Form to be completed by student.
type EmptyForm struct {
	Id string `json:"id,omitempty"`
	// Name of the module evaluated.
	ModuleName string `json:"moduleName,omitempty"`
	Profs []Prof `json:"profs,omitempty"`
	Tutors []Tutor `json:"tutors,omitempty"`
	AbstractForm AbstractForm `json:"abstractForm,omitempty"`
	Course Course `json:"course,omitempty"`
}
