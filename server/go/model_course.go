/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import uuid "github.com/satori/go.uuid"

type Course struct {
	Base

	ModuleId uuid.UUID `gorm:"type:uuid;" json:"moduleId"`

	FormId uuid.UUID `gorm:"type:uuid;" json:"formId"`

	TermId uuid.UUID `gorm:"type:uuid;" json:"termId"`

	Location string `json:"location"`

	NumberOfStudents int32 `json:"numberOfStudents"`

	Language string `json:"language"`

	// Third-party Key, that identifies a course
	ThirdPartyKey string `json:"thirdPartyKey,omitempty"`

	// current status for sent mails for this course
	Progress string `json:"progress"`

	// Describes whether, this course is published to profs and tutors.
	Clearance string `json:"clearance"`

	Tutors []Tutor `json:"tutors"`
}
