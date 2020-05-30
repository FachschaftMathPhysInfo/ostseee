package openapi

import (
	"fmt"
	"time"

	uuid "github.com/satori/go.uuid"
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
func (ev *EvalService) FindForm(id uuid.UUID) (Form, error) {
	return ev.EvalRepository.FindForm(id)
}

func (ev *EvalService) FindAllTerms() []Term {
	return ev.EvalRepository.FindAllTerms()
}
func (ev *EvalService) FindTerm(id uuid.UUID) (Term, error) {
	return ev.EvalRepository.FindTerm(id)
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
func (ev *EvalService) FindAllCourses() []Course {
	return ev.EvalRepository.FindAllCourses()
}
func (ev *EvalService) FindCourse(id uuid.UUID) (Course, error) {
	return ev.EvalRepository.FindCourse(id)
}
func (ev *EvalService) DeleteCourse(id uuid.UUID) error {
	return ev.EvalRepository.DeleteCourse(id)
}
func (ev *EvalService) SaveCourse(course Course) (Course, error) {
	//BUG(henrik): no validity check are done (yet!)
	if course.NumberOfStudents < 0 {
		return Course{}, fmt.Errorf("courses.NumberOfStudents<0")
	}
	return ev.EvalRepository.SaveCourse(course), nil
}

func (ev *EvalService) SaveModule(module Module) (Module, error) {
	//BUG(henrik): no validity check is done (yet!)
	return ev.EvalRepository.SaveModule(module), nil
}

func (ev *EvalService) FindAllModules() []Module {
	return ev.EvalRepository.FindAllModules()
}
func (ev *EvalService) FindModule(id uuid.UUID) (Module, error) {
	return ev.EvalRepository.FindModule(id)
}
func (ev *EvalService) DeleteModule(id uuid.UUID) error {
	return ev.EvalRepository.DeleteModule(id)
}
func (ev *EvalService) SaveProf(prof Prof) (Prof, error) {
	//BUG(henrik): no validity check is done (yet!)
	return ev.EvalRepository.SaveProf(prof), nil
}

func (ev *EvalService) FindAllProfs() []Prof {
	return ev.EvalRepository.FindAllProfs()
}

func (ev *EvalService) DeleteProf(id uuid.UUID) error {
	return ev.EvalRepository.DeleteProf(id)
}

func (ev *EvalService) FindProf(id uuid.UUID) (Prof, error) {
	return ev.EvalRepository.FindProf(id)
}

func (ev *EvalService) FindFaculty(id uuid.UUID) (Faculty, error) {
	return ev.EvalRepository.FindFaculty(id)
}

func (ev *EvalService) SaveCourseProf(courseprof CourseProf) (CourseProf, error) {
	//BUG(henrik): no validity check is done (yet!)
	return ev.EvalRepository.SaveCourseProf(courseprof), nil
}

func (ev *EvalService) FindAllCourseProfs() []CourseProf {
	return ev.EvalRepository.FindAllCourseProfs()
}

func (ev *EvalService) DeleteCourseProf(id uuid.UUID) error {
	return ev.EvalRepository.DeleteCourseProf(id)
}

func (ev *EvalService) FindCourseProf(id uuid.UUID) (CourseProf, error) {
	return ev.EvalRepository.FindCourseProf(id)
}

func (ev *EvalService) SaveTutor(tutor Tutor) (Tutor, error) {
	//BUG(henrik): no validity check is done (yet!)
	return ev.EvalRepository.SaveTutor(tutor), nil
}

func (ev *EvalService) FindAllTutors(courseId uuid.UUID) []Tutor {
	return ev.EvalRepository.FindAllCourseTutors(courseId)
}

func (ev *EvalService) DeleteTutor(courseId uuid.UUID, tutorId uuid.UUID) error {
	return ev.EvalRepository.DeleteTutor(courseId, tutorId)
}

func (ev *EvalService) FindCourseTutor(courseId, tutorId uuid.UUID) (Tutor, error) {
	return ev.EvalRepository.FindTutor(courseId, tutorId)
}

func (ev *EvalService) FindAllCourseTutors(courseId uuid.UUID) []Tutor {
	return ev.EvalRepository.FindAllCourseTutors(courseId)
}
