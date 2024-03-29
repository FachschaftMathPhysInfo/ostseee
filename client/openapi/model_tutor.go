/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi
// Tutor Subteacher, only sees portions of the results of his course. Currently they are created for every year newly.
type Tutor struct {
	Id string `json:"id,omitempty"`
	Name string `json:"name"`
	// Determines, whether public reports can include, this persons results.
	Censored bool `json:"censored"`
	// Date of agreement that results can be published
	CensoredDate string `json:"censoredDate"`
	// Third-party Key, that identifies a tutor.
	ThirdPartyKey string `json:"thirdPartyKey,omitempty"`
	Email string `json:"email"`
}
