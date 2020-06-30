/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi
// Page Group of sections that belong together
type Page struct {
	Id string `json:"id,omitempty"`
	Sections []Section `json:"sections"`
	// Used to determine position in array
	Position int32 `json:"position,omitempty"`
}