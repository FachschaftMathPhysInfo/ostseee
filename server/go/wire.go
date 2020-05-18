//+build wireinject

package openapi

import (
	"github.com/google/wire"
	"github.com/jinzhu/gorm"
)

func initEvalAPI(db *gorm.DB) EvalAPI {
	wire.Build(ProvideEvalRepository, ProvideEvalService, ProvideEvalAPI)

	return EvalAPI{}
}
