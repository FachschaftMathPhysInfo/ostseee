package openapi

import "github.com/jinzhu/gorm"

type EvalRepository struct {
	DB *gorm.DB
}

//ProvideEvalRepository provides Eval Repository
func ProvideEvalRepository(DB *gorm.DB) EvalRepository {
	return EvalRepository{DB: DB}
}

// FindAllFaculties returns all Faculties
func (ev *EvalRepository) FindAllFaculties() []Faculty {
	var faculties []Faculty
	ev.DB.Find(&faculties)

	return faculties
}

func (ev *EvalRepository) Save(fac Faculty) Faculty {
	ev.DB.Save(&fac)
	return fac
}
