/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi
// StatusSysstats struct for StatusSysstats
type StatusSysstats struct {
	Ram float32 `json:"ram,omitempty"`
	Ram10 float32 `json:"ram10,omitempty"`
	Cpu float32 `json:"cpu,omitempty"`
	Cpu10 float32 `json:"cpu10,omitempty"`
}
