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

type Answer struct {
	QuestionaireId uuid.UUID `gorm:"type:uuid;" json:"questionaireId"`

	QuestionId uuid.UUID `gorm:"type:uuid;index:idx_answer" json:"questionId"`
	//BUG(henrik): Concerns must be integrated into the api
	Concerns uuid.UUID `gorm:"type:uuid;index:idx_answer" json:"concerns"`

	NotApplicable bool `json:"notApplicable"`

	Values []string `gorm:"-" json:"values"`
}

type SingleAnswer struct {
	QuestionaireId uuid.UUID `gorm:"type:uuid;" json:"questionaireId"`

	QuestionId uuid.UUID `gorm:"type:uuid;index:idx_singleanswer" json:"questionId"`
	//BUG(henrik): Concerns must be integrated into the api
	Concerns uuid.UUID `gorm:"type:uuid;index:idx_singleanswer" json:"concerns"`

	NotApplicable bool `json:"notApplicable"`

	Value string `json:"value"`
}
