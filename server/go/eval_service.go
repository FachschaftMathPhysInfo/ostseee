package openapi

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
