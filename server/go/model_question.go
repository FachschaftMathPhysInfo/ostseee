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

type Question struct {
	Base

	SectionId uuid.UUID `gorm:"type:uuid" json:"-"`

	// Unique, humanreadable label.
	Shortcode string `json:"shortcode"`

	TitledObject

	// Whether this question is a single choice or multiple choice question
	IsMulti bool `json:"isMulti"`

	// Determines whether it is a free text form. Can not occur with isMulti and hasOtherOption.
	IsComment bool `json:"isComment"`

	// Some questions have an option that allows custom answers
	HasOtherOption bool `json:"hasOtherOption"`

	// Question either concerns course, lecturer or tutor.
	Regards string `json:"regards"`

	// Some questions need a not applicable option.
	HasNotApplicableOption bool `json:"hasNotApplicableOption,omitempty"`

	// Defines how results should be displayed.
	Visualizer string `json:"visualizer"`

	// Array of possibly labeled selection options.
	Options []Option `gorm:"foreignkey:QuestionId" json:"options"`

	//Answers []Answer `gorm:"foreignkey:QuestionId"`
}
