/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi
// Prof struct for Prof
type Prof struct {
	Id string `json:"id,omitempty"`
	Firstname string `json:"firstname"`
	Lastname string `json:"lastname"`
	Title string `json:"title"`
	// Determines, whether public reports can include, this persons results.
	Censored bool `json:"censored"`
	// Date of agreement that results can be published
	CensoredDate string `json:"censoredDate"`
	// Used to communicate to prof.
	Email string `json:"email"`
}