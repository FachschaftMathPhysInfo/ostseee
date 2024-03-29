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

type Section struct {
	Base

	TitledObject
	Position  int32      `json:"position"`
	PageId    uuid.UUID  `gorm:"type:uuid" json:"-"`
	Questions []Question `gorm:"foreignkey:SectionId" json:"questions"`
}
