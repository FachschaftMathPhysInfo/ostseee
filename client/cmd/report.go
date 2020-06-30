package cmd

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"strings"
	"text/template"

	"github.com/antihax/optional"
	"github.com/fachschaftmathphys/ostseee/client/openapi"
	"github.com/spf13/cobra"
)

var Locale = "de"

func getNames(arr []openapi.Prof) string {
	names := make([]string, len(arr))
	for i, v := range arr {
		names[i] = v.Lastname
	}
	return strings.Join(names, "/ ")
}
func lesc(s string) string {
	//BUG(henrik): Write replacements
	return strings.ReplaceAll(strings.ReplaceAll(s, "\\", ""), "%", "\\%")
}

func getTutor(courseId, tutorId string) openapi.Tutor {
	res, _, _ := NewAPIClient().DefaultApi.CoursesCourseIdTutorsTutorIdGet(context.TODO(), courseId, tutorId)
	return res
}

var translations = map[string](map[string]string){
	"by":                map[string]string{"de": "bei", "en": "by"},
	"tex_lang":          map[string]string{"de": "ngerman", "en": "english"},
	"comments":          map[string]string{"de": "Kommentare", "en": "Comments"},
	"answers":           map[string]string{"de": "Antworten", "en": "answers"},
	"abstinentions":     map[string]string{"de": "keine Angabe", "en": "n.A."},
	"unanswered":        map[string]string{"de": "keine Antworten", "en": "no answers"},
	"tutorium_overview": map[string]string{"de": "Tutor  & Seite", "en": "Tutor  & Page"},
}

func i18n(s string) string {
	return translations[s][Locale]
}
func i18n_map(s map[string]string) string {
	return lesc(s[Locale])
}
func answers(arr []openapi.ResultPair) string {
	names := make([]string, len(arr))
	for i, v := range arr {
		names[i] = v.Value
	}
	return strings.Join(names, ",")
}
func shortAnswers(arr []openapi.ResultPair) string {
	answers := make([]string, len(arr))
	for i, v := range arr {
		answers[i] = i18n_map(v.Label)
	}
	return strings.Join(answers, ",")
}
func countValues(arr []openapi.ResultPair) string {
	sum := 0
	for _, v := range arr {
		s, _ := strconv.Atoi(v.Value)
		sum = sum + s
	}
	return strconv.Itoa(sum)
}
func toPercentage(arr []openapi.ResultPair) string {
	sum := 0
	for _, v := range arr {
		s, _ := strconv.Atoi(v.Value)
		sum = sum + s
	}
	percentages := make([]string, len(arr))
	for i, v := range arr {
		s, _ := strconv.Atoi(v.Value)
		percentages[i] = fmt.Sprint(100 * float64(s) / float64(sum))
	}
	return strings.Join(percentages, ",")
}
func last(arr []openapi.ResultPair) openapi.ResultPair {
	return arr[len(arr)-1]
}

var funcMap = template.FuncMap{
	// The name "title" is what the function will be called in the template text.
	"getNames":     getNames,
	"lesc":         lesc,
	"i18n":         i18n,
	"i18n_map":     i18n_map,
	"answers":      answers,
	"countValues":  countValues,
	"shortAnswers": shortAnswers,
	"toPercentage": toPercentage,
	"last":         last,
	"getTutor":     getTutor,
}
var ReportTutorCmd = &cobra.Command{
	Use:   "tutor",
	Short: "generates a report for a given tutor ",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(args)
		tutorId := args[1]
		courseId := args[0]
		outputFile := tutorId + ".pdf"
		if len(args) > 2 {
			outputFile = args[2]
		}

		t, err := template.New("tutor_report").Delims("≤≤", "≥≥").Funcs(funcMap).ParseFiles("./reporting/templates/tutor_report.tmpl", "./reporting/templates/preamble.tmpl", "./reporting/templates/preface.tmpl", "./reporting/templates/tutor.tmpl", "./reporting/templates/common.tmpl")
		if err != nil {
			fmt.Println(err)
		}
		type TutorReportRendering struct {
			TutorReport openapi.TutorReport
			Tutor       openapi.Tutor
			Term        openapi.Term
			Module      openapi.Module
			Faculty     openapi.Faculty
			Course      openapi.Course
			CourseProfs []openapi.Prof
		}
		apiClient := NewAPIClient()
		trd := TutorReportRendering{}
		file, _ := os.Create(outputFile)
		trd.Course, _, _ = apiClient.DefaultApi.CoursesCourseIdGet(cmd.Context(), courseId)
		trd.Tutor, _, _ = apiClient.DefaultApi.CoursesCourseIdTutorsTutorIdGet(cmd.Context(), courseId, tutorId)
		trd.Term, _, _ = apiClient.DefaultApi.TermsTermIdGet(cmd.Context(), trd.Course.TermId)
		trd.Module, _, _ = apiClient.DefaultApi.ModulesModuleIdGet(cmd.Context(), trd.Course.ModuleId)
		trd.TutorReport, _, _ = apiClient.DefaultApi.CoursesCourseIdTutorsTutorIdReportGet(cmd.Context(), courseId, tutorId)
		cPs, _, _ := apiClient.DefaultApi.CourseprofsGet(cmd.Context(), &openapi.CourseprofsGetOpts{CourseId: optional.NewString(courseId)})
		trd.CourseProfs = make([]openapi.Prof, len(cPs))
		for i, cp := range cPs {
			trd.CourseProfs[i], _, _ = apiClient.DefaultApi.ProfsProfIdGet(cmd.Context(), cp.ProfId)
			trd.CourseProfs[i].Id = cp.Id
		}
		t.ExecuteTemplate(file, "tutor_report", &trd)
	},
	Args: cobra.MinimumNArgs(2),
}
var ReportCourseCmd = &cobra.Command{
	Use:   "course",
	Short: "generates a report for a given tutor ",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(args)
		courseId := args[0]
		outputFile := courseId + ".pdf"
		if len(args) > 1 {
			outputFile = args[1]
		}

		t, err := template.New("course_report").Delims("≤≤", "≥≥").Funcs(funcMap).ParseFiles("./reporting/templates/tutor_report.tmpl", "./reporting/templates/preamble.tmpl", "./reporting/templates/preface.tmpl", "./reporting/templates/tutor.tmpl", "./reporting/templates/common.tmpl", "./reporting/templates/course.tmpl", "./reporting/templates/course_report.tmpl")
		if err != nil {
			fmt.Println(err)
		}
		type CourseReportRendering struct {
			CourseReport openapi.CourseReport
			Term         openapi.Term
			Module       openapi.Module
			Faculty      openapi.Faculty
			Course       openapi.Course
			CourseProfs  []openapi.Prof
			Tutors       []openapi.Tutor
		}
		apiClient := NewAPIClient()
		trd := CourseReportRendering{}
		file, _ := os.Create(outputFile)
		trd.Course, _, _ = apiClient.DefaultApi.CoursesCourseIdGet(cmd.Context(), courseId)
		trd.Term, _, _ = apiClient.DefaultApi.TermsTermIdGet(cmd.Context(), trd.Course.TermId)
		trd.Module, _, _ = apiClient.DefaultApi.ModulesModuleIdGet(cmd.Context(), trd.Course.ModuleId)
		trd.CourseReport, _, _ = apiClient.DefaultApi.CoursesCourseIdReportGet(cmd.Context(), courseId)
		trd.Tutors, _, _ = apiClient.DefaultApi.CoursesCourseIdTutorsGet(cmd.Context(), courseId)
		cPs, _, _ := apiClient.DefaultApi.CourseprofsGet(cmd.Context(), &openapi.CourseprofsGetOpts{CourseId: optional.NewString(courseId)})
		trd.CourseProfs = make([]openapi.Prof, len(cPs))
		for i, cp := range cPs {
			trd.CourseProfs[i], _, _ = apiClient.DefaultApi.ProfsProfIdGet(cmd.Context(), cp.ProfId)
			trd.CourseProfs[i].Id = cp.Id
		}
		t.ExecuteTemplate(file, "course_report", &trd)
	},
	Args: cobra.MinimumNArgs(1),
}
var ReportCmd = &cobra.Command{
	Use:   "report",
	Short: "Generate reports.",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Please run with a type.")
	},
}