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
