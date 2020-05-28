package openapi

import (
	"fmt"
	"time"
)

type EvalService struct {
	EvalRepository EvalRepository
}

func ProvideEvalService(rep EvalRepository) EvalService {
	return EvalService{EvalRepository: rep}
}
func (ev *EvalService) FindAllFaculties() []Faculty {
	return ev.EvalRepository.FindAllFaculties()
}
func (ev *EvalService) Save(fac Faculty) Faculty {
	return ev.EvalRepository.Save(fac)
}

func (ev *EvalService) SaveForm(form Form) Form {
	return ev.EvalRepository.SaveForm(form)
}
func (ev *EvalService) FindAllForms() []Form {
	return ev.EvalRepository.FindAllForms()
}

func (ev *EvalService) FindAllTerms() []Term {
	return ev.EvalRepository.FindAllTerms()
}
func (ev *EvalService) SaveTerm(term Term) (Term, error) {
	beginDateTime, err := time.Parse("2006-01-02", term.Begin)
	if err != nil {
		return Term{}, err
	}
	endDateTime, err := time.Parse("2006-01-02", term.End)
	if err != nil {
		return Term{}, err
	}
	if beginDateTime.Before(endDateTime) {
		return ev.EvalRepository.SaveTerm(term), nil
	}
	return Term{}, fmt.Errorf("Term.Begin>=Term.end")
}
