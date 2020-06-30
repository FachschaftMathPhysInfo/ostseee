/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi
// Result struct for Result
type Result struct {
	Id string `json:"id,omitempty"`
	// Map of translations for a given string. A string might contain markdown code.
	Label map[string]string `json:"label,omitempty"`
	// indicate, how result is displayed.
	Visualizer string `json:"visualizer,omitempty"`
	// gives the number of not applicable.
	NotApplicableCount float32 `json:"notApplicableCount,omitempty"`
	Values []ResultPair `json:"values,omitempty"`
}