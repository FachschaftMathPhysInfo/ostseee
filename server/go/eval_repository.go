package openapi

import (
	"crypto/sha1"
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

//FindFaculty finds a specific faculty
func (ev *EvalRepository) FindFaculty(id uuid.UUID) (Faculty, error) {
	var faculty Faculty
	filter := &Faculty{}
	if id == uuid.Nil {
		return faculty, fmt.Errorf("nil is not allowed")
	}
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

	ev.DB.Preload("AbstractForm").Preload("AbstractForm.Pages", func(db *gorm.DB) *gorm.DB {
		return db.Order("pages.position ASC")
	}).Preload("AbstractForm.Pages.Sections", func(db *gorm.DB) *gorm.DB {
		return db.Order("sections.position ASC")
	}).Preload("AbstractForm.Pages.Sections.Questions", func(db *gorm.DB) *gorm.DB {
		return db.Order("questions.position ASC")
	}).Preload("AbstractForm.Pages.Sections.Questions.Options", func(db *gorm.DB) *gorm.DB {
		return db.Order("options.position ASC")
	}).Find(&forms)
	return forms
}

func (ev *EvalRepository) FindForm(id uuid.UUID) (Form, error) {
	var form Form
	filter := &Form{}
	if id == uuid.Nil {
		return form, fmt.Errorf("nil is not allowed")
	}
	filter.Id = id

	ev.DB.Preload("AbstractForm").Preload("AbstractForm.Pages", func(db *gorm.DB) *gorm.DB {
		return db.Order("pages.position ASC")
	}).Preload("AbstractForm.Pages.Sections", func(db *gorm.DB) *gorm.DB {
		return db.Order("sections.position ASC")
	}).Preload("AbstractForm.Pages.Sections.Questions", func(db *gorm.DB) *gorm.DB {
		return db.Order("questions.position ASC")
	}).Preload("AbstractForm.Pages.Sections.Questions.Options", func(db *gorm.DB) *gorm.DB {
		return db.Order("options.position ASC")
	}).Where(filter).First(&form)
	return form, nil
}

//FindAllTerms find all terms.
func (ev *EvalRepository) FindAllTerms() []Term {
	var terms []Term
	ev.DB.Find(&terms)
	return terms
}

//FindTerm Finds a specific Term
func (ev *EvalRepository) FindTerm(id uuid.UUID) (Term, error) {
	var term Term
	filter := &Term{}
	if id == uuid.Nil {
		return term, fmt.Errorf("nil is not allowed")
	}
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

//FindCourse finds a course by id
func (ev *EvalRepository) FindCourse(id uuid.UUID) (Course, error) {
	var course Course
	filter := &Course{}
	if id == uuid.Nil {
		return course, fmt.Errorf("nil is not allowed")
	}
	filter.Id = id
	ev.DB.Where(filter).First(&course)
	return course, nil
}

//FindCourseByThirdPartyKey finds a course By ThirdPartyKey
func (ev *EvalRepository) FindCourseByThirdPartyKey(thirdPartyKey string) (Course, error) {
	var course Course
	filter := &Course{}
	if thirdPartyKey == "" {
		return course, fmt.Errorf("nil is not allowed")
	}
	filter.ThirdPartyKey = thirdPartyKey
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

//FindModule finds a module by id
func (ev *EvalRepository) FindModule(id uuid.UUID) (Module, error) {
	var module Module
	filter := &Module{}
	if id == uuid.Nil {
		return module, fmt.Errorf("nil is not allowed")
	}
	filter.Id = id
	ev.DB.Where(filter).First(&module)
	return module, nil
}
func (ev *EvalRepository) DeleteModule(id uuid.UUID) error {
	m := Module{}
	if id == uuid.Nil {
		return fmt.Errorf("nil is not allowed")
	}
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
	if id == uuid.Nil {
		return fmt.Errorf("nil is not allowed")
	}
	p.Id = id
	ev.DB.Delete(&p)
	return nil
}

//FindProf finds a prof by id
func (ev *EvalRepository) FindProf(id uuid.UUID) (Prof, error) {
	var prof Prof
	filter := &Prof{}
	if id == uuid.Nil {
		return prof, fmt.Errorf("nil is not allowed")
	}
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
func (ev *EvalRepository) FindAllCourseProfs(courseId uuid.UUID, profId uuid.UUID) []CourseProf {
	var courseprofs []CourseProf
	var filter CourseProf
	filter.CourseId = courseId
	filter.ProfId = profId
	ev.DB.Where(&filter).Find(&courseprofs)

	return courseprofs
}

func (ev *EvalRepository) DeleteCourseProf(id uuid.UUID) error {
	p := CourseProf{}
	if id == uuid.Nil {
		return fmt.Errorf("nil is not allowed")
	}
	p.Id = id
	ev.DB.Delete(&p)
	return nil
}
func (ev *EvalRepository) DeleteCourse(id uuid.UUID) error {
	p := Course{}
	p.Id = id
	if id == uuid.Nil {
		return fmt.Errorf("nil is not allowed")
	}
	ev.DB.Delete(&p)
	return nil
}

func (ev *EvalRepository) FindCourseProf(id uuid.UUID) (CourseProf, error) {
	var courseprof CourseProf
	filter := &CourseProf{}
	if id == uuid.Nil {
		return courseprof, fmt.Errorf("nil is not allowed")
	}
	filter.Id = id
	ev.DB.Where(filter).First(&courseprof)
	return courseprof, nil
}

// FindAllTutors returns all tutors
func (ev *EvalRepository) FindAllCourseTutors(courseId uuid.UUID) ([]Tutor, error) {
	var tutors []Tutor
	filter := &Tutor{}
	if courseId == uuid.Nil {
		return tutors, fmt.Errorf("nil is not allowed")
	}
	filter.CourseId = courseId
	ev.DB.Where(filter).Find(&tutors)
	return tutors, nil
}

func (ev *EvalRepository) DeleteTutor(courseId, tutorId uuid.UUID) error {
	p := Tutor{}
	if tutorId == uuid.Nil {
		return fmt.Errorf("nil is not allowed")
	}
	if courseId == uuid.Nil {
		return fmt.Errorf("nil is not allowed")
	}
	p.Id = tutorId
	p.CourseId = courseId
	ev.DB.Delete(&p)
	return nil
}

func (ev *EvalRepository) FindTutor(courseId, tutorId uuid.UUID) (Tutor, error) {
	var tutor Tutor
	filter := &Tutor{}
	if tutorId == uuid.Nil {
		return tutor, fmt.Errorf("nil is not allowed")
	}
	if courseId == uuid.Nil {
		return tutor, fmt.Errorf("nil is not allowed")
	}
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
	if courseId == uuid.Nil {
		return fmt.Errorf("nil is not allowed")
	}
	ev.DB.Where("course_id = ?", courseId).Delete(Invitation{})
	return nil
}

//SaveInvitation upserts a term, i.e. if a invitation with this id exists it will be created.
func (ev *EvalRepository) SaveInvitation(invitation Invitation) Invitation {
	ev.DB.Save(&invitation)
	return invitation
}

func (ev *EvalRepository) FindCourseInvitations(courseId uuid.UUID) ([]Invitation, error) {
	var invs []Invitation
	ev.DB.Where("course_id = ?", courseId).Find(&invs)
	return invs, nil
}

func (ev *EvalRepository) FindInvitation(id uuid.UUID) (Invitation, error) {
	var inv Invitation
	filter := &Invitation{}
	if id == uuid.Nil {
		return inv, fmt.Errorf("no Invitation with that id")
	}
	filter.Id = id
	ev.DB.Where(filter).First(&inv)
	return inv, nil
}

//FindAllCourseProfsForCourse returns all courseProfs profs with id = courseProfId
func (ev *EvalRepository) FindAllCourseProfsForCourse(courseId uuid.UUID) ([]Prof, error) {
	var courseprofs []CourseProf
	var filter CourseProf
	if courseId == uuid.Nil {
		return nil, fmt.Errorf("nil is not allowed")
	}
	filter.CourseId = courseId
	ev.DB.Where(&filter).Find(&courseprofs)
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

func (ev *EvalRepository) CountOfQuestionaires(courseId uuid.UUID) int {
	var filter Questionaire
	filter.CourseId = courseId
	var count int
	ev.DB.Table("questionaires").Where(&filter).Count(&count)
	return count
}

type Pair struct {
	Value string
	Freq  int
}

func (ev *EvalRepository) CountPerOption(questionId uuid.UUID, objectId uuid.UUID) ([]Pair, error) {
	var res []Pair
	ev.DB.Table("single_answers").Where("not_applicable <> True AND question_id = ? AND concerns = ?", questionId, objectId).Select("value, count(*) as freq").Group("value").Scan(&res)
	return res, nil
}

func (ev *EvalRepository) FindAllSingleAnswers(questionId, objectId uuid.UUID) []SingleAnswer {
	var filter SingleAnswer
	filter.QuestionId = questionId
	filter.Concerns = objectId
	var results []SingleAnswer
	ev.DB.Where(&filter).Find(&results)
	return results
}

func (ev *EvalRepository) CountNotApplicable(questionId uuid.UUID, objectId uuid.UUID) int {
	var filter SingleAnswer
	filter.QuestionId = questionId
	filter.Concerns = objectId
	filter.NotApplicable = true
	var count int
	ev.DB.Table("single_answers").Where(&filter).Count(&count)
	return count
}
func sha1Hash(text string) string {
	h := sha1.New()
	h.Write([]byte(text))
	return fmt.Sprintf("%x", h.Sum(nil))
}
func (ev *EvalRepository) GetInvitationForLTIAssignment(courseId uuid.UUID, userId string) (string, error) {
	var filter LTIAssignment
	filter.CustomerHash = sha1Hash(courseId.String() + userId)
	var lti LTIAssignment
	ev.DB.Where(&filter).First(&lti)
	if lti.InvitationId != uuid.Nil {
		return lti.InvitationId.String(), nil
	}
	var inv Invitation
	ev.DB.Joins("LEFT JOIN lti_assignments t2 ON invitations.ID = t2.invitation_id WHERE t2.invitation_id IS NULL AND invitations.course_id = ? ", courseId).First(&inv)
	if inv.Id == uuid.Nil {
		return "", fmt.Errorf("not enough unused invitations")
	}
	filter.InvitationId = inv.Id
	ev.DB.Save(&filter)
	return inv.Id.String(), nil
}

func (ev *EvalRepository) GetCount(tablename string) int32 {
	var count int
	ev.DB.Table(tablename).Count(&count)
	return int32(count)
}
