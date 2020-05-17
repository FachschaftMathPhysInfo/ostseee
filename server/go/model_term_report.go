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

type TermReport struct {

	Id string `json:"id,omitempty"`

	Generated time.Time `json:"generated,omitempty"`

	TermId string `json:"termId,omitempty"`

	FacultyId string `json:"facultyId,omitempty"`

	Censored bool `json:"censored,omitempty"`

	CourseProfReports []CourseProfReport `json:"courseProfReports,omitempty"`
}
