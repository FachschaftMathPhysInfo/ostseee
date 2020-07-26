package cmd

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"text/template"
	"time"

	"gopkg.in/russross/blackfriday.v2"

	"github.com/antihax/optional"
	"github.com/fachschaftmathphys/ostseee/client/openapi"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	bflatex "gitlab.com/ambrevar/blackfriday-latex"
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
	extensions := blackfriday.CommonExtensions | blackfriday.Titleblock
	renderer := &bflatex.Renderer{
		Author:    "John Doe",
		Languages: "english,french",
		Flags:     bflatex.TOC,
	}
	md := blackfriday.New(blackfriday.WithRenderer(renderer), blackfriday.WithExtensions(extensions))
	res := string(string(renderer.Render(md.Parse([]byte(strings.ReplaceAll(s, ">", "¿>"))))))
	//fmt.Println(blackfriday.Run([]byte(s), blackfriday.WithRenderer(renderer)))
	return strings.ReplaceAll(res, "¿>", ">") //strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(s, "\\", ""), "%", "\\%"), "&", "\\&"), "#", "\\#")
}

func getTutor(courseId, tutorId string) openapi.Tutor {
	ctx := context.WithValue(context.TODO(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
	res, _, _ := NewAPIClient().DefaultApi.CoursesCourseIdTutorsTutorIdGet(ctx, courseId, tutorId)
	return res
}
func add(a, b float32) float32 {
	return a + b
}

var translations = map[string](map[string]string){
	"by":                      map[string]string{"de": "bei", "en": "by"},
	"tex_lang":                map[string]string{"de": "ngerman", "en": "english"},
	"comments":                map[string]string{"de": "Kommentare", "en": "Comments"},
	"answers":                 map[string]string{"de": "Antworten", "en": "answers"},
	"abstinentions":           map[string]string{"de": "keine Angabe", "en": "n.A."},
	"unanswered":              map[string]string{"de": "keine Antworten", "en": "no answers"},
	"tutorium_overview":       map[string]string{"de": "Tutor  & Seite", "en": "Tutor  & Page"},
	"questions_about":         map[string]string{"de": "Fragen zu", "en": "Questions regarding"},
	"questions_concerning_ex": map[string]string{"de": "Fragen zu den Tutorien", "en": "Questions regarding exercise groups"},
	"no_of_students":          map[string]string{"de": "Anzahl angeschriebener Studierende", "en": "Number of Students"},
	"no_of_questionnaires":    map[string]string{"de": "Anzahl abgegebener Fragebögen", "en": "Number of questionnaires submitted"},
	"overview_stats":          map[string]string{"de": "Übersicht", "en": "Overview"},
	"comment_notice": map[string]string{"de": "{ \\small\\emph{Hinweis: } Jeder Kommentar ist eine individuelle Meinung und sollte immer im Verhältnis zu der Anzahl der Studierenden gesehen werden.}",
		"en": "{ \\small\\emph{Note: } Each comment is an individual opinion and should be considered in relation to the total number of students.}"},
	"too_few": map[string]string{"de": "{ \\small\\emph{Hinweis: } Da weniger als 5 Fragebögen abgegeben wurden, konnte diese Veranstaltung nicht ausgewertet werden.}",
		"en": "{ \\small\\emph{Note: } Because less than 5 questionnaires were submitted and in order to retain the anonymity of the participants, these results were excluded. }"},
}

func i18n(s string) string {
	return translations[s][Locale]
}
func i18n_map(s map[string]string) string {
	res, ok := s[Locale]
	if !ok {
		res, ok = s["en"]
	}
	if !ok {
		res, ok = s["de"]
	}
	return lesc(res)
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
		percentages[i] = fmt.Sprintf("%.1f", 100*float64(s)/float64(sum))
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
	"add":          add,
}
var ReportTutorCmd = &cobra.Command{
	Use:   "tutor",
	Short: "generates a report for a given tutor ",
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		fmt.Println(args)
		tutorId := args[1]
		courseId := args[0]
		outputFile := tutorId + ".tex"
		if len(args) > 2 {
			outputFile = args[2]
		}

		t, err := template.New("tutor_report").Delims("≤≤", "≥≥").Funcs(funcMap).ParseFiles("./reporting/templates/tutor_report.tmpl", "./reporting/templates/preamble.tmpl", "./reporting/templates/preface.tmpl", "./reporting/templates/tutor.tmpl", "./reporting/templates/too_few.tmpl", "./reporting/templates/common.tmpl")
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
		trd.Course, _, _ = apiClient.DefaultApi.CoursesCourseIdGet(ctx, courseId)
		trd.Tutor, _, _ = apiClient.DefaultApi.CoursesCourseIdTutorsTutorIdGet(ctx, courseId, tutorId)
		trd.Term, _, _ = apiClient.DefaultApi.TermsTermIdGet(ctx, trd.Course.TermId)
		trd.Module, _, _ = apiClient.DefaultApi.ModulesModuleIdGet(ctx, trd.Course.ModuleId)
		trd.Faculty, _, err = apiClient.DefaultApi.FacultiesFacultyIdGet(ctx, trd.Module.FacultyId)
		if err != nil {
			log.Println(err)
		}
		trd.TutorReport, _, err = apiClient.DefaultApi.CoursesCourseIdTutorsTutorIdReportGet(ctx, courseId, tutorId)
		if err != nil {
			log.Println(err)
			t.ExecuteTemplate(file, "too_few", &trd)
			return
		}
		cPs, _, _ := apiClient.DefaultApi.CourseprofsGet(ctx, &openapi.CourseprofsGetOpts{CourseId: optional.NewString(courseId)})
		trd.CourseProfs = make([]openapi.Prof, len(cPs))
		for i, cp := range cPs {
			trd.CourseProfs[i], _, _ = apiClient.DefaultApi.ProfsProfIdGet(ctx, cp.ProfId)
			trd.CourseProfs[i].Id = cp.Id
		}
		t.ExecuteTemplate(file, "tutor_report", &trd)
	},
	Args: cobra.MinimumNArgs(2),
}
var ReportCourseCmd = &cobra.Command{
	Use:   "course",
	Short: "generates a report for a given course (not including profs) ",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(args)
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
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
		trd.Course, _, err = apiClient.DefaultApi.CoursesCourseIdGet(ctx, courseId)
		if err != nil {
			log.Println(err)
		}
		trd.Term, _, err = apiClient.DefaultApi.TermsTermIdGet(ctx, trd.Course.TermId)
		if err != nil {
			log.Println(err)
		}
		trd.Module, _, err = apiClient.DefaultApi.ModulesModuleIdGet(ctx, trd.Course.ModuleId)
		if err != nil {
			log.Println(err)
		}
		trd.Faculty, _, err = apiClient.DefaultApi.FacultiesFacultyIdGet(ctx, trd.Module.FacultyId)
		if err != nil {
			log.Println(err)
		}
		trd.CourseReport, _, err = apiClient.DefaultApi.CoursesCourseIdReportGet(ctx, courseId)
		if err != nil {
			log.Println(err)
		}
		trd.Tutors, _, err = apiClient.DefaultApi.CoursesCourseIdTutorsGet(ctx, courseId)
		if err != nil {
			log.Println(err)
		}
		cPs, _, _ := apiClient.DefaultApi.CourseprofsGet(ctx, &openapi.CourseprofsGetOpts{CourseId: optional.NewString(courseId)})
		trd.CourseProfs = make([]openapi.Prof, len(cPs))
		for i, cp := range cPs {
			trd.CourseProfs[i], _, _ = apiClient.DefaultApi.ProfsProfIdGet(ctx, cp.ProfId)
			trd.CourseProfs[i].Id = cp.Id
		}
		t.ExecuteTemplate(file, "course_report", &trd)
	},
	Args: cobra.MinimumNArgs(1),
}

var ReportCourseProfCmd = &cobra.Command{
	Use:   "course_prof",
	Short: "generates a report for a given prof ",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(args)
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		courseprofId := args[0]
		outputFile := courseprofId + ".pdf"
		if len(args) > 1 {
			outputFile = args[1]
		}

		t, err := template.New("course_prof_report").Delims("≤≤", "≥≥").Funcs(funcMap).ParseFiles("./reporting/templates/tutor_report.tmpl", "./reporting/templates/preamble.tmpl",
			"./reporting/templates/preface.tmpl", "./reporting/templates/tutor.tmpl", "./reporting/templates/common.tmpl", "./reporting/templates/course.tmpl",
			"./reporting/templates/course_prof.tmpl", "./reporting/templates/course_report.tmpl", "./reporting/templates/too_few.tmpl", "./reporting/templates/course_prof_report.tmpl")
		if err != nil {
			fmt.Println(err)
		}
		type CourseProfReportRendering struct {
			CourseProfReport openapi.CourseProfReport
			Term             openapi.Term
			Stats            openapi.CourseStats
			Module           openapi.Module
			Faculty          openapi.Faculty
			Course           openapi.Course
			CourseProfs      []openapi.Prof
			CourseProf       openapi.Prof
			Tutors           []openapi.Tutor
		}
		apiClient := NewAPIClient()
		trd := CourseProfReportRendering{}
		file, _ := os.Create(outputFile)
		courseProf, _, err := apiClient.DefaultApi.CourseprofsCourseProfIdGet(ctx, courseprofId)
		if err != nil {
			fmt.Println(err)
		}
		trd.CourseProf, _, _ = apiClient.DefaultApi.ProfsProfIdGet(ctx, courseProf.ProfId)
		trd.Course, _, err = apiClient.DefaultApi.CoursesCourseIdGet(ctx, courseProf.CourseId)
		if err != nil {
			log.Println(err)
		}
		trd.Stats, _, err = apiClient.DefaultApi.CoursesCourseIdStatsGet(ctx, courseProf.CourseId)
		if err != nil {
			log.Println(err)
		}
		trd.Term, _, err = apiClient.DefaultApi.TermsTermIdGet(ctx, trd.Course.TermId)
		if err != nil {
			log.Println(err)
		}
		trd.Module, _, err = apiClient.DefaultApi.ModulesModuleIdGet(ctx, trd.Course.ModuleId)
		if err != nil {
			log.Println(err)
		}
		trd.Faculty, _, err = apiClient.DefaultApi.FacultiesFacultyIdGet(ctx, trd.Module.FacultyId)
		if err != nil {
			log.Println(err)
		}
		trd.Tutors, _, err = apiClient.DefaultApi.CoursesCourseIdTutorsGet(ctx, courseProf.CourseId)
		if err != nil {
			log.Println(err)
		}
		cPs, _, _ := apiClient.DefaultApi.CourseprofsGet(ctx, &openapi.CourseprofsGetOpts{CourseId: optional.NewString(courseProf.CourseId)})
		trd.CourseProfs = make([]openapi.Prof, len(cPs))
		for i, cp := range cPs {
			trd.CourseProfs[i], _, _ = apiClient.DefaultApi.ProfsProfIdGet(ctx, cp.ProfId)
			trd.CourseProfs[i].Id = cp.Id
		}
		start := time.Now()
		trd.CourseProfReport, _, err = apiClient.DefaultApi.CourseprofsCourseProfIdReportGet(ctx, courseprofId)
		end := time.Now()

		log.Println("Took:", end.Sub(start).Seconds())
		if err != nil {
			log.Println(err)
			t.ExecuteTemplate(file, "too_few", &trd)
			return
		}

		t.ExecuteTemplate(file, "course_prof_report", &trd)
	},
	Args: cobra.MinimumNArgs(1),
}

var ReportCourseProfsCmd = &cobra.Command{
	Use:   "course_profs",
	Short: "generates all course_profs reports ",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(args)
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		apiClient := NewAPIClient()
		courseProfsAll, _, _ := apiClient.DefaultApi.CourseprofsGet(ctx, &openapi.CourseprofsGetOpts{})
		for _, cp := range courseProfsAll {
			courseprofId := cp.Id
			outputFile := courseprofId + ".tex"

			t, err := template.New("course_prof_report").Delims("≤≤", "≥≥").Funcs(funcMap).ParseFiles("./reporting/templates/tutor_report.tmpl", "./reporting/templates/preamble.tmpl",
				"./reporting/templates/preface.tmpl", "./reporting/templates/tutor.tmpl", "./reporting/templates/common.tmpl", "./reporting/templates/course.tmpl",
				"./reporting/templates/course_prof.tmpl", "./reporting/templates/course_report.tmpl", "./reporting/templates/course_prof_report.tmpl", "./reporting/templates/too_few.tmpl")
			if err != nil {
				fmt.Println(err)
			}
			type CourseProfReportRendering struct {
				CourseProfReport openapi.CourseProfReport
				Term             openapi.Term
				Module           openapi.Module
				Faculty          openapi.Faculty
				Course           openapi.Course
				CourseProfs      []openapi.Prof
				CourseProf       openapi.Prof
				Tutors           []openapi.Tutor
			}

			trd := CourseProfReportRendering{}
			file, _ := os.Create(outputFile)
			courseProf, _, err := apiClient.DefaultApi.CourseprofsCourseProfIdGet(ctx, courseprofId)
			if err != nil {
				fmt.Println(err)
			}
			trd.CourseProf, _, _ = apiClient.DefaultApi.ProfsProfIdGet(ctx, courseProf.ProfId)
			trd.Course, _, err = apiClient.DefaultApi.CoursesCourseIdGet(ctx, courseProf.CourseId)
			if err != nil {
				log.Println(err)
			}
			trd.Term, _, err = apiClient.DefaultApi.TermsTermIdGet(ctx, trd.Course.TermId)
			if err != nil {
				log.Println(err)
			}
			trd.Module, _, err = apiClient.DefaultApi.ModulesModuleIdGet(ctx, trd.Course.ModuleId)
			if err != nil {
				log.Println(err)
			}
			trd.Faculty, _, err = apiClient.DefaultApi.FacultiesFacultyIdGet(ctx, trd.Module.FacultyId)
			if err != nil {
				log.Println(err)
			}
			start := time.Now()
			trd.CourseProfReport, _, err = apiClient.DefaultApi.CourseprofsCourseProfIdReportGet(ctx, courseprofId)
			end := time.Now()

			log.Println("Took:", end.Sub(start).Seconds())
			if err != nil {
				log.Println(err)
				log.Println("Fehler")
				t.ExecuteTemplate(file, "too_few", &trd)
				return
			}
			trd.Tutors, _, err = apiClient.DefaultApi.CoursesCourseIdTutorsGet(ctx, courseProf.CourseId)
			if err != nil {
				log.Println(err)
			}
			cPs, _, _ := apiClient.DefaultApi.CourseprofsGet(ctx, &openapi.CourseprofsGetOpts{CourseId: optional.NewString(courseProf.CourseId)})
			trd.CourseProfs = make([]openapi.Prof, len(cPs))
			for i, cp := range cPs {
				trd.CourseProfs[i], _, _ = apiClient.DefaultApi.ProfsProfIdGet(ctx, cp.ProfId)
				trd.CourseProfs[i].Id = cp.Id
			}
			t.ExecuteTemplate(file, "course_prof_report", &trd)
		}
	},
}

var ReportCmd = &cobra.Command{
	Use:   "report",
	Short: "Generate reports.",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Please run with a type.")
	},
}
