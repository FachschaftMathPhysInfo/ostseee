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

// AbstractForm - Describes an abstract form
type AbstractForm struct {
	Base
	FormId uuid.UUID `gorm:"type:uuid;" json:"-"`
	Pages  []Page    `gorm:"foreignkey:AbstractFormId" json:"pages"`
}
