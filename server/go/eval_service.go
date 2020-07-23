package openapi

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"sort"
	"strconv"
	"time"

	uuid "github.com/satori/go.uuid"
)

const MIN_QUESTIONAIRES int = 5

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

func (ev *EvalService) FindAllTutors(courseId uuid.UUID) ([]Tutor, error) {
	return ev.EvalRepository.FindAllCourseTutors(courseId)
}

func (ev *EvalService) DeleteTutor(courseId uuid.UUID, tutorId uuid.UUID) error {
	return ev.EvalRepository.DeleteTutor(courseId, tutorId)
}

func (ev *EvalService) FindCourseTutor(courseId, tutorId uuid.UUID) (Tutor, error) {
	return ev.EvalRepository.FindTutor(courseId, tutorId)
}

func (ev *EvalService) FindAllCourseTutors(courseId uuid.UUID) ([]Tutor, error) {
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
	if len(invs) < int(course.NumberOfStudents) {
		//create new ones
		invs2 := make([]Invitation, int(course.NumberOfStudents)-len(invs))
		var i int
		log.Println("Generating", begin, end)
		for i = 0; i < int(course.NumberOfStudents)-len(invs); i++ {
			inv := Invitation{ValidBegin: begin, ValidEnd: end, CourseId: courseId, Used: false}
			invs2[i] = ev.EvalRepository.SaveInvitation(inv)
		}
		return invs2, nil
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
	if len(tutors) == 0 {
		tutors = make([]Tutor, 0)
	}
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
	tutors, err := ev.FindAllCourseTutors(inv.CourseId)
	if err != nil {
		return EmptyForm{}, err
	}
	emptyForm.Tutors = privaticeTutors(tutors)
	emptyForm.Course, _ = ev.FindCourse(inv.CourseId)
	module, _ := ev.FindModule(emptyForm.Course.ModuleId)
	emptyForm.ModuleName = module.Name
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
func isIn(u uuid.UUID, uuids []uuid.UUID) bool {
	for _, v := range uuids {
		if u == v {
			return true
		}
	}
	return false
}

//ValidateAndSaveQuestionaire validates and saves a questionaire. Beaware, that there can only exist one subteacher in answer
func (ev *EvalService) ValidateAndSaveQuestionaire(invitationId uuid.UUID, quest Questionaire) error {
	inv, err := ev.EvalRepository.FindInvitation(invitationId)
	quest.CourseId = inv.CourseId
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
	//load course Information
	course, err := ev.EvalRepository.FindCourse(inv.CourseId)
	tutors, err := ev.EvalRepository.FindAllCourseTutors(inv.CourseId)
	courseProfs, err := ev.EvalRepository.FindAllCourseProfsForCourse(inv.CourseId)
	validUUIDs := make([]uuid.UUID, len(tutors)+len(courseProfs)+1)
	validUUIDs[0] = course.Id
	for i, v := range courseProfs {
		validUUIDs[i+1] = v.Id //WARNING(henrik): This uses a trick of findallCourseProfs that overrides all ids
	}
	for i, v := range tutors {
		validUUIDs[i+len(courseProfs)+1] = v.Id //WARNING(henrik): This uses a trick of findallCourseProfs that overrides all ids
	}
	if err != nil {
		return err
	}
	//load questions
	form, err := ev.EvalRepository.FindForm(course.FormId)
	questions := FormQuestionsToMap(form)
	//make storage to count how many answers are to multiperson questions.
	multiPersonMap := make(map[uuid.UUID]int)
	for _, answer := range quest.Answers {
		quest := questions[answer.QuestionId]
		//now check - if load was sucessfull
		if quest.Id == uuid.Nil {
			return fmt.Errorf("Question not found: %s", answer.QuestionId.String())
		}
		// check
		if !quest.HasNotApplicableOption && answer.NotApplicable {
			return fmt.Errorf("not applicable not allowed")
		}
		if !answer.NotApplicable {
			if !quest.IsMulti && !quest.IsComment && len(answer.Values) > 1 {
				return fmt.Errorf("len(answer.Values)>1 on single choice")
			}
			if !quest.IsComment && !quest.HasOtherOption {
				if !answer.NotApplicable && (quest.Visualizer != "tutor_overview") { //BUG(henrik): add isTutorselect!
					//check if all values are in options
					for _, val := range answer.Values {
						if !contains(quest.Options, val) {
							return fmt.Errorf("Wrong value supplied to %s: %s", quest.Title["de"], val)
						}
					}
				}
			}
			//Check if concerns is valid, does not check
			if !isIn(answer.Concerns, validUUIDs) {
				return fmt.Errorf("Answer %s is not concerning to  specific object (Question:%i)", answer.Concerns, quest.Title)
			}
			if len(courseProfs) <= 1 || quest.Regards != "lecturer" {
				delete(questions, answer.QuestionId)
			} else {
				// increase count
				multiPersonMap[answer.QuestionId]++
				// delete if reached
				if len(courseProfs) == multiPersonMap[answer.QuestionId] {
					delete(questions, answer.QuestionId)
				}
			}
		}
	}

	//now we are ready to commit to db

	return ev.EvalRepository.InvalidateInvitationAndCommitQuestionaire(invitationId, quest)
}
func reduceToRegardingSection(form AbstractForm, regards string) []Section {
	result := make([]Section, 0)
	for _, p := range form.Pages {
		for _, sec := range p.Sections {
			section := sec
			section.Questions = make([]Question, 0)
			for _, q := range sec.Questions {
				if q.Regards == regards {
					section.Questions = append(section.Questions, q)
				}
			}
			if len(section.Questions) > 0 {
				result = append(result, section)
			}
		}
	}
	return result
}

func filterOption(options []Option, value string, HasOtherOption bool) (map[string]string, int32, error) {
	for _, option := range options {
		if value == strconv.Itoa(int(option.Value)) {
			return option.Label, option.Position, nil
		}
	}
	if HasOtherOption {
		r := make(map[string]string, 0)
		r["de"] = value
		r["en"] = value
		return r, math.MaxInt32, nil
	}
	fmt.Println("opt", options)
	fmt.Println("val", value)
	return map[string]string{}, -1, fmt.Errorf("hasOtherOption not enabled and not in option")
}

func (ev *EvalService) generateResult(question Question, objectId uuid.UUID) (Result, error) {
	result := Result{Visualizer: question.Visualizer}
	result.Label = question.Title
	if question.IsComment {
		answers := ev.EvalRepository.FindAllSingleAnswers(question.Id, objectId)
		pairs := make([]ResultPair, len(answers))
		for i, answer := range answers {
			pairs[i].Value = answer.Value
		}
		result.Values = pairs
		return result, nil
	}
	if question.HasNotApplicableOption {
		//Count not applicable
		result.NotApplicableCount = ev.EvalRepository.CountNotApplicable(question.Id, objectId)
	}
	counts, err := ev.EvalRepository.CountPerOption(question.Id, objectId)
	fmt.Println(counts)
	if err != nil {
		return Result{}, err
	}
	resultpairs := make([]ResultPair, len(counts))
	for i, pair := range counts {
		label, position, err := filterOption(question.Options, pair.Value, question.HasOtherOption)
		if err != nil && pair.Value != "" {
			return Result{}, err
		}
		resultpairs[i].Label = label
		resultpairs[i].Value = strconv.Itoa(pair.Freq)
		resultpairs[i].Position = position
	}
	for _, opt := range question.Options {
		contained := false
		for _, rp := range resultpairs {
			contained = contained || rp.Position == opt.Position
		}
		if !contained {
			added := ResultPair{
				Position: opt.Position,
				Value:    "0"}
			added.Label = opt.Label
			resultpairs = append(resultpairs, added)
		}
	}

	sort.Slice(resultpairs, func(i, j int) bool {
		return resultpairs[i].Position < resultpairs[j].Position
	})
	result.Values = resultpairs
	if result.Visualizer == "histogram" {
		result.Avg = ev.EvalRepository.AvgPerConcern(objectId, question.Id)
		result.AvgQuestion = ev.EvalRepository.AvgPerQuestion(question.Id)
		result.Stddev = ev.EvalRepository.StddevPerConcern(objectId, question.Id)
		result.StddevQuestion = ev.EvalRepository.StddevPerQuestion(question.Id)
	}
	return result, nil
}
func (ev *EvalService) generateResults(questions []Question, objectId uuid.UUID) ([]Result, error) {
	results := make([]Result, len(questions))
	for i, q := range questions {
		var err error
		results[i], err = ev.generateResult(q, objectId)
		if err != nil {
			return []Result{}, err
		}

	}
	return results, nil
}

//GenerateTutorReport generates a Tutor report
func (ev *EvalService) GenerateTutorReport(courseId, tutorId uuid.UUID) (TutorReport, error) {
	course, err := ev.EvalRepository.FindCourse(courseId)
	if err != nil {
		return TutorReport{}, err
	}
	if ev.EvalRepository.CountOfQuestionaires(courseId) < MIN_QUESTIONAIRES { //TODO(henrik): Factor in Tutor,
		return TutorReport{}, fmt.Errorf("less than %d questionaires", MIN_QUESTIONAIRES)
	}
	tutor, err := ev.EvalRepository.FindTutor(courseId, tutorId)
	if err != nil {
		return TutorReport{}, err
	}
	// load form
	form, err := ev.EvalRepository.FindForm(course.FormId)
	if err != nil {
		return TutorReport{}, err
	}
	//now find all questions to be included
	sections := reduceToRegardingSection(form.AbstractForm, "tutor")
	if len(sections) == 0 {
		return TutorReport{}, fmt.Errorf("contains no questions regarding tutor")
	}
	generatedSections := make([]ResultSection, len(sections))
	for i, sec := range sections {
		generatedSections[i].Label = sec.Title
		generatedSections[i].Results, err = ev.generateResults(sec.Questions, tutor.Id)
		if err != nil {
			return TutorReport{}, err
		}
	}
	result := TutorReport{TutorId: tutor.Id, CourseId: course.Id, Generated: time.Now(), Sections: generatedSections}
	return result, nil
}

//GenerateCourseReport generates a  report for course
func (ev *EvalService) GenerateCourseReport(courseId uuid.UUID) (CourseReport, error) {
	course, err := ev.EvalRepository.FindCourse(courseId)
	if err != nil {
		return CourseReport{}, err
	}
	if ev.EvalRepository.CountOfQuestionaires(courseId) < MIN_QUESTIONAIRES {
		return CourseReport{}, fmt.Errorf("less than %d questionaires", MIN_QUESTIONAIRES)
	}
	if err != nil {
		return CourseReport{}, err
	}
	// load form
	form, err := ev.EvalRepository.FindForm(course.FormId)
	if err != nil {
		return CourseReport{}, err
	}
	//generate Tutors report
	tutors, err := ev.EvalRepository.FindAllCourseTutors(courseId)
	if err != nil {
		return CourseReport{}, err
	}
	tutorsReport := make([]TutorReport, len(tutors))
	for i, tut := range tutors {
		tutorsReport[i], _ = ev.GenerateTutorReport(courseId, tut.Id)
		//no pass of err
	}
	//now find all questions to be included
	sections := reduceToRegardingSection(form.AbstractForm, "course")
	if len(sections) == 0 {
		return CourseReport{}, fmt.Errorf("contains no questions regarding course")
	}
	generatedSections := make([]ResultSection, len(sections))
	for i, sec := range sections {
		generatedSections[i].Label = sec.Title
		generatedSections[i].Results, err = ev.generateResults(sec.Questions, course.Id)
		if err != nil {
			return CourseReport{}, err
		}
	}
	result := CourseReport{CourseId: course.Id, Generated: time.Now(), Sections: generatedSections, TutorReports: tutorsReport}
	return result, nil
}

//GenerateCourseReport generates a  report for course
func (ev *EvalService) GenerateCourseProfReport(courseprofId uuid.UUID) (CourseProfReport, error) {
	courseprof, err := ev.EvalRepository.FindCourseProf(courseprofId)
	if err != nil {
		return CourseProfReport{}, err
	}
	course, err := ev.EvalRepository.FindCourse(courseprof.CourseId)
	if err != nil {
		return CourseProfReport{}, err
	}
	if ev.EvalRepository.CountOfQuestionaires(course.Id) < MIN_QUESTIONAIRES { //TODO(henrik): Do we have to calc how many questions are correct answered
		return CourseProfReport{}, fmt.Errorf("less than %d questionaires", MIN_QUESTIONAIRES)
	}

	// load form
	form, err := ev.EvalRepository.FindForm(course.FormId)
	if err != nil {
		return CourseProfReport{}, err
	}
	//generate course report
	coursereport, err := ev.GenerateCourseReport(courseprof.CourseId)
	if err != nil {
		return CourseProfReport{}, err
	}
	//now find all questions to be included
	sections := reduceToRegardingSection(form.AbstractForm, "lecturer")
	if len(sections) == 0 {
		return CourseProfReport{}, fmt.Errorf("contains no questions regarding course")
	}
	generatedSections := make([]ResultSection, len(sections))
	for i, sec := range sections {
		generatedSections[i].Label = sec.Title
		generatedSections[i].Results, err = ev.generateResults(sec.Questions, courseprofId)
		if err != nil {
			return CourseProfReport{}, err
		}
	}
	result := CourseProfReport{CourseId: course.Id, Generated: time.Now(), Sections: generatedSections, CourseProfId: courseprofId, CourseReport: coursereport}
	return result, nil
}

func (ev *EvalService) GetInvitationForLTI(infos LTIInfos) (string, error) {
	if !infos.IsLearner {
		return "", fmt.Errorf("You are not allowed to participate.")
	}
	course, _ := ev.EvalRepository.FindCourseByThirdPartyKey("lti:" + infos.CourseId)
	if course.Id == uuid.Nil {
		return "", fmt.Errorf("This course is not registered with our service.")
	}
	inv, err := ev.EvalRepository.GetInvitationForLTIAssignment(course.Id, infos.UserId)
	if err != nil {
		log.Println(err)
		return "", err
	}
	return inv, nil
}

func (ev *EvalService) GetCounts() StatusCounts {
	res := StatusCounts{}
	res.Courseprofs = ev.EvalRepository.GetCount("course_profs")
	res.Courses = ev.EvalRepository.GetCount("courses")
	res.Options = ev.EvalRepository.GetCount("options")
	res.Questionaires = ev.EvalRepository.GetCount("questionaires")
	res.Singleanswers = ev.EvalRepository.GetCount("single_answers")
	res.Terms = ev.EvalRepository.GetCount("terms")
	res.Tutors = ev.EvalRepository.GetCount("tutors")
	res.Invitations = ev.EvalRepository.GetCount("invitations")
	return res
}

type SendStatus struct {
	ErrNo        int    `json:"errno"`
	Vid          string `json:"vid"`
	Participants int    `json:"participants"`
	Assigned     int    `json:"assigned"`
	Overwritten  int    `json:"overwritten"`
	NotChanged   int    `json:"notchanged"`
}
type Data struct {
	BaseUrl       string   `json:"baseUrl"`
	Invitations   []string `json:"invitations"`
	ThirdPartyKey string   `json:"thirdPartyKey"`
	Begin         string   `json:"begin"`
	End           string   `json:"end"`
	Force         int32    `form:"force" json:"force"`
}

// SendInvitations finds or generates invitations and send them to the plattform
func (ev *EvalService) SendInvitations(id uuid.UUID, begin, end string, baseUrl, url string, force int32) (SendStatus, error) {
	course, err := ev.EvalRepository.FindCourse(id)
	if err != nil {
		return SendStatus{}, err
	}
	invs, err := ev.FindOrGenerateCourseInvitations(id, begin, end)
	if err != nil {
		return SendStatus{}, err
	}
	invitations := make([]string, len(invs))
	for idx, i := range invs {
		invitations[idx] = i.Id.String()
	}
	var data Data
	data.BaseUrl = baseUrl
	data.Begin = begin
	data.End = end
	data.ThirdPartyKey = course.ThirdPartyKey
	data.Invitations = invitations
	data.Force = force
	jsonData, _ := json.Marshal(&data)
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return SendStatus{}, err
	}
	defer resp.Body.Close()
	dec := json.NewDecoder(resp.Body)
	var status SendStatus
	err = dec.Decode(&status)
	return status, err
}

func (ev *EvalService) GetCourseStats(courseId uuid.UUID) CourseStats {
	return CourseStats{Questionnaires: int32(ev.EvalRepository.CountOfQuestionaires(courseId))}
}
