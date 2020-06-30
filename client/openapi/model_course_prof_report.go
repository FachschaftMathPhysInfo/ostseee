/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi
import (
	"time"
)
// CourseProfReport struct for CourseProfReport
type CourseProfReport struct {
	Id string `json:"id,omitempty"`
	CourseProfId string `json:"courseProfId,omitempty"`
	CourseId string `json:"courseId,omitempty"`
	Generated time.Time `json:"generated,omitempty"`
	CourseReport CourseReport `json:"courseReport,omitempty"`
	// contains results only concerning courseProf
	Sections []ResultSection `json:"sections,omitempty"`
}