package openapi

import uuid "github.com/satori/go.uuid"

type LTIAssignment struct {
	InvitationId uuid.UUID `gorm:"type:uuid;" json:"id,omitempty"`
	CustomerHash string
}

type LTIInfos struct {
	CourseId  string
	UserId    string
	IsLearner bool
}
