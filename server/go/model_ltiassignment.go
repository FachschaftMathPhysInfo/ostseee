package openapi

import uuid "github.com/satori/go.uuid"

type LTIAssignment struct {
	InvitationId uuid.UUID `gorm:"type:uuid;primary_key;" json:"id,omitempty"`
	CustomerHash string
}

type LTIInfos struct {
	CourseId  string
	UserId    string
	IsLearner bool
}
