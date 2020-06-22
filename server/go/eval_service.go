package openapi

import (
	"fmt"
	"log"
	"strconv"
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
	beginDateTime, err := time.Parse(time.RFC3339, term.Begin)
	if err != nil {
		return Term{}, err
	}
	endDateTime, err := time.Parse(time.RFC3339, term.End)
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

func (ev *EvalService) FindAllCourseProfs(courseId uuid.UUID, profId uuid.UUID) []CourseProf {
	return ev.EvalRepository.FindAllCourseProfs(courseId, profId)
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

func anyInvitationUsed(invs []Invitation) bool {
	for _, v := range invs {
		if v.Used {
			return true
		}
	}
	return false
}

//FindOrGenerateCourseInvitations finds or generates Course Invititations based on no of students, if there is a mismatch in numbers, they will be regenerated
func (ev *EvalService) FindOrGenerateCourseInvitations(courseId uuid.UUID, begin, end string) ([]Invitation, error) {
	course, _ := ev.EvalRepository.FindCourse(courseId)
	invs, err := ev.EvalRepository.FindCourseInvitations(courseId)
	if err != nil {
		return []Invitation{}, err
	}
	if len(invs) != int(course.NumberOfStudents) {
		log.Println("len(invs)!=course.NumberOfStudents")
		if anyInvitationUsed(invs) {
			return []Invitation{}, fmt.Errorf("Some Invitation were already used, cannot savely recreate!")
		}
		//Delete
		err = ev.EvalRepository.DeleteAllInvitationsOfCourse(courseId)
		if err != nil {
			return []Invitation{}, err
		}
		//create new ones
		invs = make([]Invitation, course.NumberOfStudents)
		var i int32
		log.Println("Generating", begin, end)
		for i = 0; i < course.NumberOfStudents; i++ {
			inv := Invitation{ValidBegin: begin, ValidEnd: end, CourseId: courseId, Used: false}
			invs[i] = ev.EvalRepository.SaveInvitation(inv)
		}
	}
	return invs, nil
}
func privaticeTutors(tutors []Tutor) []Tutor {
	for i := range tutors {
		tutors[i].Censored = false
		tutors[i].CensoredDate = ""
		tutors[i].Email = ""
		tutors[i].ThirdPartyKey = ""
	}
	return tutors
}
func (ev *EvalService) RenderInvitationToEmptyForm(invitationID uuid.UUID) (EmptyForm, error) {
	inv, err := ev.EvalRepository.FindInvitation(invitationID)
	if inv.Id == uuid.Nil {
		return EmptyForm{}, fmt.Errorf("No invitation with that ID")
	}
	//BUG(henrik): Use right format in parse!
	beginDateTime, err := time.Parse(time.RFC3339, inv.ValidBegin)

	if err != nil {
		return EmptyForm{}, err
	}
	endDateTime, err := time.Parse(time.RFC3339, inv.ValidEnd)
	if err != nil {
		return EmptyForm{}, err
	}
	if time.Now().Before(beginDateTime) {
		return EmptyForm{}, fmt.Errorf("invitation not valid")
	}
	if time.Now().After(endDateTime) {
		return EmptyForm{}, fmt.Errorf("invitation not valid")
	}
	if inv.Used {
		return EmptyForm{}, fmt.Errorf("invitation not valid")
	}
	emptyForm := EmptyForm{}
	emptyForm.Id = invitationID
	emptyForm.Profs, _ = ev.EvalRepository.FindAllCourseProfsForCourse(inv.CourseId) //BUG(henrik): we need the id of courseProf
	emptyForm.Tutors = privaticeTutors(ev.FindAllCourseTutors(inv.CourseId))
	emptyForm.Course, _ = ev.FindCourse(inv.CourseId)
	emptyForm.Course.Tutors = []Tutor{} //protect Identity
	form, _ := ev.EvalRepository.FindForm(emptyForm.Course.FormId)
	emptyForm.AbstractForm = form.AbstractForm
	return emptyForm, nil
}
func FormQuestionsToMap(form Form) map[uuid.UUID]Question {
	res := make(map[uuid.UUID]Question)
	for _, p := range form.AbstractForm.Pages {
		for _, s := range p.Sections {
			for _, q := range s.Questions {
				res[q.Id] = q
			}
		}
	}
	return res
}
func contains(options []Option, value string) bool {
	for _, opt := range options {
		if strconv.Itoa(int(opt.Value)) == value {
			return true
		}
	}
	return false
}
func (ev *EvalService) ValidateAndSaveQuestionaire(invitationId uuid.UUID, quest Questionaire) error {
	inv, err := ev.EvalRepository.FindInvitation(invitationId)
	if err != nil {
		return err
	}
	//BUG(henrik): Use right format in parse!
	beginDateTime, err := time.Parse(time.RFC3339, inv.ValidBegin)
	if err != nil {
		return err
	}
	endDateTime, err := time.Parse(time.RFC3339, inv.ValidEnd)
	if err != nil {
		return err
	}
	if time.Now().Before(beginDateTime) {
		return fmt.Errorf("invitation not valid")
	}
	if time.Now().After(endDateTime) {
		return fmt.Errorf("invitation not valid")
	}
	if inv.Used {
		return fmt.Errorf("invitation not valid")
	}
	//load questions
	course, err := ev.EvalRepository.FindCourse(inv.CourseId)
	if err != nil {
		return err
	}
	form, err := ev.EvalRepository.FindForm(course.FormId)
	questions := FormQuestionsToMap(form)
	for _, answer := range quest.Answers {
		quest := questions[answer.QuestionId]
		//now check - if load was sucessfull
		if quest.Id == uuid.Nil {
			return fmt.Errorf("Question not found")
		}
		// check
		if !quest.HasNotApplicableOption && answer.NotApplicable {
			return fmt.Errorf("not applicable not allowed")
		}
		if !quest.IsMulti && !quest.IsComment && len(answer.Values) > 1 {
			return fmt.Errorf("len(answer.Values)>1 on single choice")
		}
		if !quest.IsComment && !quest.HasOtherOption {
			//check if all values are in options
			for _, val := range answer.Values {
				if !contains(quest.Options, val) {
					return fmt.Errorf("Wrong value supplied")
				}
			}
		}
		//BUG(henrik): check if ids of referenced is right
		if answer.Concerns == uuid.Nil {
			return fmt.Errorf("Answer is not marked to a specific object")
		}
		delete(questions, answer.QuestionId)
	}

	//now we are ready to commit to db

	return ev.EvalRepository.InvalidateInvitationAndCommitQuestionaire(invitationId, quest)
}
