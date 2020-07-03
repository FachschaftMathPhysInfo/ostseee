/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi
// StatusCounts struct for StatusCounts
type StatusCounts struct {
	Terms float32 `json:"terms,omitempty"`
	Tutors float32 `json:"tutors,omitempty"`
	Options float32 `json:"options,omitempty"`
	Profs float32 `json:"profs,omitempty"`
	Courseprofs float32 `json:"courseprofs,omitempty"`
	Courses float32 `json:"courses,omitempty"`
	Questionaires float32 `json:"questionaires,omitempty"`
	Singleanswers float32 `json:"singleanswers,omitempty"`
}
