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

	QuestionId uuid.UUID `gorm:"type:uuid;" json:"questionId"`

	NotApplicable bool `json:"notApplicable"`

	Values []string `json:"values"`
}
