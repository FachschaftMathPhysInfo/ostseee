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
func (ev *EvalRepository) SaveForm(form Form) Form {
	ev.DB.Save(&form)
	return form
}
func (ev *EvalRepository) FindAllForms() []Form {
	var forms []Form
	ev.DB.Set("gorm:auto_preload", true).Find(&forms)
	return forms
}

func (ev *EvalRepository) FindAllTerms() []Term {
	var terms []Term
	ev.DB.Find(&terms)
	return terms
}

func (ev *EvalRepository) SaveTerm(term Term) Term {
	ev.DB.Save(&term)
	return term
}
