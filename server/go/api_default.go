/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	lti "github.com/henrixapp/go-lti"
	uuid "github.com/satori/go.uuid"
	"github.com/shirou/gopsutil/mem"
)

type EvalAPI struct {
	EvalService EvalService
}

func ProvideEvalAPI(ev EvalService) EvalAPI {
	return EvalAPI{EvalService: ev}
}

// CourseprofsCourseProfIdDelete - Deletes a module by ID
func (ev *EvalAPI) CourseprofsCourseProfIdDelete(c *gin.Context) {
	id, err := uuid.FromString(c.Param("courseProfId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	err = ev.EvalService.DeleteCourseProf(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.Status(http.StatusNoContent)
}

// CourseprofsCourseProfIdGet - Get a courseprof by ID
func (ev *EvalAPI) CourseprofsCourseProfIdGet(c *gin.Context) {
	id, err := uuid.FromString(c.Param("courseProfId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	courseprof, err := ev.EvalService.FindCourseProf(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, courseprof)
}

// CourseprofsCourseProfIdPatch - Change a courseprof by ID
func (ev *EvalAPI) CourseprofsCourseProfIdPatch(c *gin.Context) {
	var courseprof CourseProf
	err := c.BindJSON(&courseprof)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	id, err := uuid.FromString(c.Param("courseProfId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	courseprof.Id = id
	co, err := ev.EvalService.SaveCourseProf(courseprof)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, co)
}

// CourseprofsCourseProfIdReportGet - Get a courseProf report
func (ev *EvalAPI) CourseprofsCourseProfIdReportGet(c *gin.Context) {
	courseprofId, err := uuid.FromString(c.Param("courseProfId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	report, err := ev.EvalService.GenerateCourseProfReport(courseprofId)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, report)
}

// CourseprofsGet -
func (ev *EvalAPI) CourseprofsGet(c *gin.Context) {
	type CourseProfParams struct {
		CourseId string `form:"courseId"`
		ProfId   string `form:"profId"`
	}
	var courseProfparams CourseProfParams
	c.Bind(&courseProfparams)

	c.JSON(http.StatusOK, ev.EvalService.FindAllCourseProfs(uuid.FromStringOrNil(courseProfparams.CourseId), uuid.FromStringOrNil(courseProfparams.ProfId)))
}

// CourseprofsPost -
func (ev *EvalAPI) CourseprofsPost(c *gin.Context) {
	var courseprof CourseProf
	err := c.BindJSON(&courseprof)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	co, err := ev.EvalService.SaveCourseProf(courseprof)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, co)
}

// CoursesCourseIdDelete - Deletes a module by ID
func (ev *EvalAPI) CoursesCourseIdDelete(c *gin.Context) {
	id, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	err = ev.EvalService.DeleteCourse(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.Status(http.StatusNoContent)
}

// CoursesCourseIdGet - Get a course by ID
func (ev *EvalAPI) CoursesCourseIdGet(c *gin.Context) {
	id, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	course, err := ev.EvalService.FindCourse(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, course)
}

// CoursesCourseIdInvitationsGet -
func (ev *EvalAPI) CoursesCourseIdInvitationsGet(c *gin.Context) {
	type Timespan struct {
		Begin string `form:"begin"`
		End   string `form:"end"`
	}
	var timespan Timespan
	c.Bind(&timespan)
	log.Println(timespan)
	id, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	invitations, err := ev.EvalService.FindOrGenerateCourseInvitations(id, timespan.Begin, timespan.End)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, invitations)
}

// CoursesCourseIdInvitationsSendPost -
func (ev *EvalAPI) CoursesCourseIdInvitationsSendPost(c *gin.Context) {
	type Settings struct {
		Begin        string `form:"begin" json:"begin"`
		End          string `form:"end" json:"end"`
		BaseUrl      string `form:"baseUrl" json:"baseUrl"`
		PlattformUrl string `form:"plattformUrl" json:"plattformUrl"`
		Force        int32  `form:"force" json:"force"`
	}
	var settings Settings
	c.Bind(&settings)
	log.Println(settings)
	id, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	status, err := ev.EvalService.SendInvitations(id, settings.Begin, settings.End, settings.BaseUrl, settings.PlattformUrl, settings.Force)
	if err != nil {
		log.Println(err)
		c.String(http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, status)
}

// CoursesCourseIdPatch - Change a course by ID
func (ev *EvalAPI) CoursesCourseIdPatch(c *gin.Context) {
	var course Course
	err := c.BindJSON(&course)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	id, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	course.Id = id
	co, err := ev.EvalService.SaveCourse(course)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, co)
}

// CoursesCourseIdReportGet - Get a course report
func (ev *EvalAPI) CoursesCourseIdReportGet(c *gin.Context) {
	courseId, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	report, err := ev.EvalService.GenerateCourseReport(courseId)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, report)
}

// CoursesCourseIdTutorsGet -
func (ev *EvalAPI) CoursesCourseIdTutorsGet(c *gin.Context) {
	courseId, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	tutors, err := ev.EvalService.FindAllCourseTutors(courseId)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, tutors)
}

// CoursesCourseIdTutorsPost -
func (ev *EvalAPI) CoursesCourseIdTutorsPost(c *gin.Context) {
	var tutor Tutor
	err := c.BindJSON(&tutor)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	courseId, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	tutor.CourseId = courseId
	co, err := ev.EvalService.SaveTutor(tutor)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, co)
}

// CoursesCourseIdTutorsTutorIdDelete - Deletes a tutor by ID
func (ev *EvalAPI) CoursesCourseIdTutorsTutorIdDelete(c *gin.Context) {

	tutorId, err := uuid.FromString(c.Param("tutorId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	courseId, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	err = ev.EvalService.DeleteTutor(courseId, tutorId)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.Status(http.StatusNoContent)
}

// CoursesCourseIdTutorsTutorIdGet - Get a tutor by ID
func (ev *EvalAPI) CoursesCourseIdTutorsTutorIdGet(c *gin.Context) {
	courseId, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	tutorId, err := uuid.FromString(c.Param("tutorId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	tutor, err := ev.EvalService.FindCourseTutor(courseId, tutorId)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, tutor)
}

// CoursesCourseIdTutorsTutorIdPatch - Change a tutor by ID
func (ev *EvalAPI) CoursesCourseIdTutorsTutorIdPatch(c *gin.Context) {
	var tutor Tutor
	err := c.BindJSON(&tutor)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	courseId, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	tutorId, err := uuid.FromString(c.Param("tutorId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	tutor.Id = tutorId
	tutor.CourseId = courseId
	co, err := ev.EvalService.SaveTutor(tutor)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, co)
}

// CoursesCourseIdTutorsTutorIdReportGet - Get a tutor report
func (ev *EvalAPI) CoursesCourseIdTutorsTutorIdReportGet(c *gin.Context) {
	courseId, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	tutorId, err := uuid.FromString(c.Param("tutorId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	report, err := ev.EvalService.GenerateTutorReport(courseId, tutorId)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, report)
}

// CoursesGet -
func (ev *EvalAPI) CoursesGet(c *gin.Context) {
	c.JSON(http.StatusOK, ev.EvalService.FindAllCourses())
}

// CoursesPost -
func (ev *EvalAPI) CoursesPost(c *gin.Context) {
	var course Course
	err := c.BindJSON(&course)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	co, err := ev.EvalService.SaveCourse(course)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, co)
}

// FacultiesFacultyIdGet - Get a faculty by ID
func (ev *EvalAPI) FacultiesFacultyIdGet(c *gin.Context) {
	id, err := uuid.FromString(c.Param("facultyId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	faculty, err := ev.EvalService.FindFaculty(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, faculty)
}

// FacultiesFacultyIdPatch - Change a faculty by ID
func (ev *EvalAPI) FacultiesFacultyIdPatch(c *gin.Context) {
	var faculty Faculty
	err := c.BindJSON(&faculty)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	//BUG(henrik): if faculty id doesn't exists the faculty will be created.
	id := c.Params.ByName("facultyId")
	faculty.Id, err = uuid.FromString(id)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, ev.EvalService.Save(faculty))
}

// FacultiesGet -
func (ev *EvalAPI) FacultiesGet(c *gin.Context) {
	c.JSON(http.StatusOK, ev.EvalService.FindAllFaculties())
}

// FacultiesPost -
func (ev *EvalAPI) FacultiesPost(c *gin.Context) {
	var faculty Faculty
	err := c.BindJSON(&faculty)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, ev.EvalService.Save(faculty))
}

// FormsFormIdGet - Get a form by ID
func (ev *EvalAPI) FormsFormIdGet(c *gin.Context) {
	id := c.Params.ByName("formId")
	uid, err := uuid.FromString(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	form, err := ev.EvalService.FindForm(uid)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, form)
}

// FormsFormIdPatch - Change a form by ID
func (ev *EvalAPI) FormsFormIdPatch(c *gin.Context) {
	id := c.Params.ByName("formId")
	uid, err := uuid.FromString(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	var form Form
	c.Bind(&form)
	form.Id = uid
	//BUG(henrik): check for errors!
	f := ev.EvalService.EvalRepository.SaveForm(form)
	c.JSON(http.StatusOK, f)
}

// FormsGet -
func (ev *EvalAPI) FormsGet(c *gin.Context) {
	c.JSON(http.StatusOK, ev.EvalService.FindAllForms())
}

// FormsPost -
func (ev *EvalAPI) FormsPost(c *gin.Context) {
	var form Form
	err := c.BindJSON(&form)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, ev.EvalService.SaveForm(form))
}

// ModulesGet -
func (ev *EvalAPI) ModulesGet(c *gin.Context) {
	c.JSON(http.StatusOK, ev.EvalService.FindAllModules())
}

// ModulesModuleIdDelete - Deletes a module by ID
func (ev *EvalAPI) ModulesModuleIdDelete(c *gin.Context) {
	id, err := uuid.FromString(c.Param("moduleId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	err = ev.EvalService.DeleteModule(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.Status(http.StatusNoContent)
}

// ModulesModuleIdGet - Get a module by ID
func (ev *EvalAPI) ModulesModuleIdGet(c *gin.Context) {
	id, err := uuid.FromString(c.Param("moduleId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	module, err := ev.EvalService.FindModule(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, module)
}

// ModulesModuleIdPatch - Change a module by ID
func (ev *EvalAPI) ModulesModuleIdPatch(c *gin.Context) {
	var module Module
	err := c.BindJSON(&module)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	id, err := uuid.FromString(c.Param("moduleId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	module.Id = id
	m, err := ev.EvalService.SaveModule(module)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, m)
}

// ModulesPost -
func (ev *EvalAPI) ModulesPost(c *gin.Context) {
	var module Module
	err := c.BindJSON(&module)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	m, err := ev.EvalService.SaveModule(module)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, m)
}

// ProfsGet -
func (ev *EvalAPI) ProfsGet(c *gin.Context) {
	c.JSON(http.StatusOK, ev.EvalService.FindAllProfs())
}

// ProfsPost -
func (ev *EvalAPI) ProfsPost(c *gin.Context) {
	var prof Prof
	err := c.BindJSON(&prof)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	co, err := ev.EvalService.SaveProf(prof)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, co)
}

// ProfsProfIdDelete - Deletes a module by ID
func (ev *EvalAPI) ProfsProfIdDelete(c *gin.Context) {
	id, err := uuid.FromString(c.Param("profId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	err = ev.EvalService.DeleteProf(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.Status(http.StatusNoContent)
}

// ProfsProfIdGet - Get a prof by ID
func (ev *EvalAPI) ProfsProfIdGet(c *gin.Context) {
	id, err := uuid.FromString(c.Param("profId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	prof, err := ev.EvalService.FindProf(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, prof)
}

// ProfsProfIdPatch - Change a prof by ID
func (ev *EvalAPI) ProfsProfIdPatch(c *gin.Context) {
	var prof Prof
	err := c.BindJSON(&prof)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	id, err := uuid.FromString(c.Param("profId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	prof.Id = id
	co, err := ev.EvalService.SaveProf(prof)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, co)
}

// QuestionaireInvitationIdGet -
func (ev *EvalAPI) QuestionaireInvitationIdGet(c *gin.Context) {
	id, err := uuid.FromString(c.Param("invitationId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	eform, err := ev.EvalService.RenderInvitationToEmptyForm(id)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, eform)
}

// QuestionaireInvitationIdPost -
func (ev *EvalAPI) QuestionaireInvitationIdPost(c *gin.Context) {
	var questionaire Questionaire
	err := c.BindJSON(&questionaire)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	invId, err := uuid.FromString(c.Param("invitationId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	err = ev.EvalService.ValidateAndSaveQuestionaire(invId, questionaire)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.Status(http.StatusNoContent)
}

// TermsGet -
func (ev *EvalAPI) TermsGet(c *gin.Context) {
	c.JSON(http.StatusOK, ev.EvalService.FindAllTerms())
}

// TermsPost -
func (ev *EvalAPI) TermsPost(c *gin.Context) {
	var term Term
	err := c.BindJSON(&term)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	t, err := ev.EvalService.SaveTerm(term)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, t)
}

// TermsTermIdGet - Get a term by ID
func (ev *EvalAPI) TermsTermIdGet(c *gin.Context) {
	id, err := uuid.FromString(c.Param("termId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	term, err := ev.EvalService.FindTerm(id)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, term)
}

// TermsTermIdPatch - Change a term by ID
func (ev *EvalAPI) TermsTermIdPatch(c *gin.Context) {
	var term Term
	err := c.BindJSON(&term)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	id, err := uuid.FromString(c.Param("termId"))
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	term.Id = id
	t, err := ev.EvalService.SaveTerm(term)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, t)
}

// TermsTermIdReportGet - Get a term report
func (ev *EvalAPI) TermsTermIdReportGet(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}

type Cartridge struct {
	Title           string `xml:"blti:title"`
	Description     string `xml:"blti:description"`
	LaunchUrl       string `xml:"blti:launch_url"`
	SecureLaunchUrl string `xml:"blti:secure_launch_url"`
	Icon            string `xml:"blti:icon"`
}
type LTIConfig struct {
	Cartridge Cartridge `xml:"cartridge_basiclti_link"`
	Blti      string    `xml:"xmlns:blti,attr"`
}

func (ev *EvalAPI) LTIConfig(c *gin.Context) {

	c.XML(http.StatusOK, LTIConfig{Blti: "http://www.imsglobal.org/xsd/imsbasiclti_v1p0", Cartridge: Cartridge{Title: "Evaluation", Description: "Evaluation", LaunchUrl: "https://" + c.Request.Host + "/distributor/lti_launch", SecureLaunchUrl: "https://" + c.Request.Host + "/distributor/lti_launch", Icon: "https://" + c.Request.Host + "/logo192.png"}})
}

func stringContains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

//LTILaunch Performs a search in database  for a course with the given ID and returns a invitation.
func (ev *EvalAPI) LTILaunch(c *gin.Context) {
	// Create a new LTIToolProvider
	ltiRequest, err := lti.NewLTIToolProvider(c.Request)
	if err != nil {
		log.Println("err:", err)
		return
	}
	// Validate LTI request
	valid, err := ltiRequest.ValidateRequest(os.Getenv("LTI_SECRET_KEY"), true, false, true, func(path string) string {
		return path
	})

	var res LTIInfos
	res.CourseId = ltiRequest.LTIHeaders.ContextID
	res.UserId = ltiRequest.LTIHeaders.UserId
	res.IsLearner = stringContains(ltiRequest.LTIHeaders.Roles.GetUndefinedRoles(), "Learner") //BUG(henrik): Moodle is not standard compliant!
	if valid == true {
		inv, err := ev.EvalService.GetInvitationForLTI(res)
		if err != nil {
			log.Println(err)
			c.String(http.StatusBadRequest, err.Error())
		}
		c.Redirect(http.StatusMovedPermanently, "https://"+c.Request.Host+"/questionaire/"+inv)
	} else {
		log.Println(err)
		// Redirect to return URL
		//returnUrl, _ := ltiRequest.CreateReturnURL()
		c.String(http.StatusBadRequest, "Couldn't validate your request.")
	}
}

func (ev *EvalAPI) StatusGet(c *gin.Context) {
	var status Status
	status.Generated = time.Now()
	v, _ := mem.VirtualMemory()
	status.Sysstats.Ram = float32(v.Total / 1024 / 1024)
	status.Sysstats.Ram10 = float32(v.Used / 1024 / 1024)
	status.Counts = ev.EvalService.GetCounts()
	c.JSON(http.StatusOK, status)
}

func (ev *EvalAPI) CourseCourseIdStatsGet(c *gin.Context) {
	id, err := uuid.FromString(c.Param("courseId"))
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	stats := ev.EvalService.GetCourseStats(id)
	c.JSON(http.StatusOK, stats)
}
