package openapi

import (
	"fmt"

	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

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

//Save upserts a faculty, i.e. if a faculty with this id exists it will be created.
func (ev *EvalRepository) Save(fac Faculty) Faculty {
	ev.DB.Save(&fac)
	return fac
}

func (ev *EvalRepository) FindFaculty(id uuid.UUID) (Faculty, error) {
	var faculty Faculty
	filter := &Faculty{}
	filter.Id = id
	ev.DB.Where(filter).First(&faculty)
	return faculty, nil
}

//SaveForm upserts a form, i.e. if a form with this id exists it will be created.
func (ev *EvalRepository) SaveForm(form Form) Form {
	ev.DB.Save(&form)
	return form
}

//FindAllForms loads all forms and their abstractForms
func (ev *EvalRepository) FindAllForms() []Form {
	var forms []Form
	ev.DB.Set("gorm:auto_preload", true).Find(&forms)
	return forms
}

func (ev *EvalRepository) FindForm(id uuid.UUID) (Form, error) {
	var form Form
	filter := &Form{}
	filter.Id = id
	ev.DB.Set("gorm:auto_preload", true).Where(filter).First(&form)
	return form, nil
}

//FindAllTerms find all terms.
func (ev *EvalRepository) FindAllTerms() []Term {
	var terms []Term
	ev.DB.Find(&terms)
	return terms
}
func (ev *EvalRepository) FindTerm(id uuid.UUID) (Term, error) {
	var term Term
	filter := &Term{}
	filter.Id = id
	ev.DB.Where(filter).First(&term)
	return term, nil
}

//SaveTerm upserts a term, i.e. if a term with this id exists it will be created.
func (ev *EvalRepository) SaveTerm(term Term) Term {
	ev.DB.Save(&term)
	return term
}

//SaveCourse upserts a term, i.e. if a course with this id exists it will be created.
func (ev *EvalRepository) SaveCourse(course Course) Course {
	ev.DB.Save(&course)
	return course
}

// FindAllCourses returns all Courses
func (ev *EvalRepository) FindAllCourses() []Course {
	//BUG(henrik): return only subset
	var courses []Course
	ev.DB.Find(&courses)

	return courses
}

func (ev *EvalRepository) FindCourse(id uuid.UUID) (Course, error) {
	var course Course
	filter := &Course{}
	filter.Id = id
	ev.DB.Where(filter).First(&course)
	return course, nil
}

//SaveModule upserts a term, i.e. if a module with this id exists it will be created.
func (ev *EvalRepository) SaveModule(module Module) Module {
	ev.DB.Save(&module)
	return module
}

// FindAllModules returns all modules
func (ev *EvalRepository) FindAllModules() []Module {
	//BUG(henrik): return only subset
	var modules []Module
	ev.DB.Find(&modules)

	return modules
}

func (ev *EvalRepository) FindModule(id uuid.UUID) (Module, error) {
	var module Module
	filter := &Module{}
	filter.Id = id
	ev.DB.Where(filter).First(&module)
	return module, nil
}
func (ev *EvalRepository) DeleteModule(id uuid.UUID) error {
	m := Module{}
	m.Id = id
	ev.DB.Delete(&m)
	return nil
}

//SaveProf upserts a prof, i.e. if a prof with this id exists it will be created.
func (ev *EvalRepository) SaveProf(prof Prof) Prof {
	ev.DB.Save(&prof)
	return prof
}

// FindAllProfs returns all profs
func (ev *EvalRepository) FindAllProfs() []Prof {
	//BUG(henrik): return only subset
	var profs []Prof
	ev.DB.Find(&profs)

	return profs
}

func (ev *EvalRepository) DeleteProf(id uuid.UUID) error {
	p := Prof{}
	p.Id = id
	ev.DB.Delete(&p)
	return nil
}

func (ev *EvalRepository) FindProf(id uuid.UUID) (Prof, error) {
	var prof Prof
	filter := &Prof{}
	filter.Id = id
	ev.DB.Where(filter).First(&prof)
	return prof, nil
}

//Save^ upserts a term, i.e. if a courseprof with this id exists it will be created.
func (ev *EvalRepository) SaveCourseProf(courseprof CourseProf) CourseProf {
	ev.DB.Save(&courseprof)
	return courseprof
}

// FindAllCourseProfs returns all courseprofs
func (ev *EvalRepository) FindAllCourseProfs() []CourseProf {
	//BUG(henrik): return only subset
	var courseprofs []CourseProf
	ev.DB.Find(&courseprofs)

	return courseprofs
}

func (ev *EvalRepository) DeleteCourseProf(id uuid.UUID) error {
	p := CourseProf{}
	p.Id = id
	ev.DB.Delete(&p)
	return nil
}
func (ev *EvalRepository) DeleteCourse(id uuid.UUID) error {
	p := Course{}
	p.Id = id
	ev.DB.Delete(&p)
	return nil
}

func (ev *EvalRepository) FindCourseProf(id uuid.UUID) (CourseProf, error) {
	var courseprof CourseProf
	filter := &CourseProf{}
	filter.Id = id
	ev.DB.Where(filter).First(&courseprof)
	return courseprof, nil
}

// FindAllTutors returns all tutors
func (ev *EvalRepository) FindAllCourseTutors(courseId uuid.UUID) []Tutor {
	var tutors []Tutor
	filter := &Tutor{}
	filter.CourseId = courseId
	ev.DB.Where(filter).Find(&tutors)
	return tutors
}

func (ev *EvalRepository) DeleteTutor(courseId, tutorId uuid.UUID) error {
	p := Tutor{}
	p.Id = tutorId
	p.CourseId = courseId
	ev.DB.Delete(&p)
	return nil
}

func (ev *EvalRepository) FindTutor(courseId, tutorId uuid.UUID) (Tutor, error) {
	var tutor Tutor
	filter := &Tutor{}
	filter.Id = tutorId
	filter.CourseId = courseId
	ev.DB.Where(filter).First(&tutor)
	return tutor, nil
}

//SaveTutor upserts a term, i.e. if a tutor with this id exists it will be created.
func (ev *EvalRepository) SaveTutor(tutor Tutor) Tutor {
	ev.DB.Save(&tutor)
	return tutor
}

func (ev *EvalRepository) DeleteAllInvitationsOfCourse(courseId uuid.UUID) error {
	ev.DB.Where("course_id LIKE ?", courseId).Delete(Invitation{})
	return nil
}

//SaveInvitation upserts a term, i.e. if a invitation with this id exists it will be created.
func (ev *EvalRepository) SaveInvitation(invitation Invitation) Invitation {
	ev.DB.Save(&invitation)
	return invitation
}

func (ev *EvalRepository) FindCourseInvitations(courseId uuid.UUID) ([]Invitation, error) {
	var invs []Invitation
	ev.DB.Where("course_id LIKE ?", courseId).Find(&invs)
	return invs, nil
}

func (ev *EvalRepository) FindInvitation(id uuid.UUID) (Invitation, error) {
	var inv Invitation
	filter := &Invitation{}
	filter.Id = id
	ev.DB.Where(filter).First(&inv)
	return inv, nil
}

//FindAllCourseProfsForCourse returns all courseProfs profs with id = courseProfId
func (ev *EvalRepository) FindAllCourseProfsForCourse(courseId uuid.UUID) ([]Prof, error) {
	var courseprofs []CourseProf
	ev.DB.Where("course_id LIKE ?", courseId).Find(&courseprofs)
	profs := make([]Prof, len(courseprofs))
	for i, cp := range courseprofs {
		profs[i], _ = ev.FindProf(cp.ProfId)
		profs[i].Id = cp.Id
		//BUG(henrik): Privacy
		profs[i].Censored = false
		profs[i].CensoredDate = ""
		profs[i].Email = ""
	}
	return profs, nil
}

func (ev *EvalRepository) InvalidateInvitationAndCommitQuestionaire(invitationId uuid.UUID, quest Questionaire) error {
	// begin a transaction
	tx := ev.DB.Begin()

	// create questionaire, with new random id
	quest.Id = uuid.Nil
	tx.Create(&quest)
	for _, ans := range quest.Answers {
		if ans.NotApplicable {
			singleAnsw := SingleAnswer{Concerns: ans.Concerns, Value: "", QuestionId: ans.QuestionId, QuestionaireId: quest.Id, NotApplicable: ans.NotApplicable}
			tx.Create(&singleAnsw)
		} else {
			for _, val := range ans.Values {
				singleAnsw := SingleAnswer{Concerns: ans.Concerns, Value: val, QuestionId: ans.QuestionId, QuestionaireId: quest.Id, NotApplicable: ans.NotApplicable}
				tx.Create(&singleAnsw)
			}
		}
	}
	// ...
	var inv Invitation
	filter := &Invitation{}
	filter.Id = invitationId
	tx.Where(filter).First(&inv)
	// rollback the transaction in case of used questionaire
	if inv.Used {
		tx.Rollback()
		return fmt.Errorf("already used")
	}
	inv.Used = true
	tx.Save(&inv)
	// Or commit on success
	tx.Commit()
	return nil
}
