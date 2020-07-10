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
	Terms         int32 `json:"terms,omitempty"`
	Tutors        int32 `json:"tutors,omitempty"`
	Options       int32 `json:"options,omitempty"`
	Profs         int32 `json:"profs,omitempty"`
	Courseprofs   int32 `json:"courseprofs,omitempty"`
	Courses       int32 `json:"courses,omitempty"`
	Questionaires int32 `json:"questionaires,omitempty"`
	Singleanswers int32 `json:"singleanswers,omitempty"`
	Invitations   int32 `json:"invitations,omitempty"`
}
