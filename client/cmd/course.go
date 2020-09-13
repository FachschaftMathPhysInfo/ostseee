package cmd

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"strings"
	"time"

	"github.com/fachschaftmathphys/ostseee/client/openapi"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var CoursesListCmd = &cobra.Command{
	Use:   "list",
	Short: "lists all courses",
	Args:  cobra.NoArgs,
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		courses, _, err := client.DefaultApi.CoursesGet(ctx)
		if err != nil {
			log.Fatalln(err)
		}
		for _, f := range courses {
			m, _, _ := client.DefaultApi.ModulesModuleIdGet(ctx, f.ModuleId)
			fmt.Printf("[%s] %s\n", f.Id, m.Name)
		}
	},
}

var CoursesGenerateInvitationsCmd = &cobra.Command{
	Use:   "invitations",
	Short: "lists all courses",
	Args:  cobra.NoArgs,
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		courses, _, err := client.DefaultApi.CoursesGet(ctx)
		if err != nil {
			log.Fatalln(err)
		}
		log.Println(viper.GetString("platform_url"))
		log.Println(viper.GetTime("begin"))
		log.Println(viper.GetTime("end"))
		for _, f := range courses {
			m, _, _ := client.DefaultApi.ModulesModuleIdGet(ctx, f.ModuleId)
			if strings.Contains(f.ThirdPartyKey, "lti") {
				_, _, err := client.DefaultApi.CoursesCourseIdInvitationsGet(ctx, f.Id, viper.GetTime("begin"), viper.GetTime("end"))
				if err != nil {
					log.Println(m.Name, err)
				}
			} else {
				force := int32(0)
				if viper.GetBool("force") {
					force = 1
				}
				mess, _, err := client.DefaultApi.CoursesCourseIdInvitationsSendPost(ctx, f.Id, openapi.ThirdPartySendSettings{Begin: viper.GetString("begin"), End: viper.GetString("end"), PlattformUrl: viper.GetString("platform_url"),
					BaseUrl: viper.GetString("base_url"),
					Force:   force})

				if err != nil || mess.Errno != 0 {
					log.Println(m.Name, err, mess.Errno)
				}
			}
		}
	},
}
var CoursesCmd = &cobra.Command{
	Use:   "courses",
	Short: "All about courses",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("call with list")
	},
}

func findAndFilterTutors(courses []openapi.Course, course openapi.Course) []openapi.Tutor {
	for _, c := range courses {
		if c.ThirdPartyKey == course.ThirdPartyKey {
			res := make([]openapi.Tutor, 0)
			for _, tut := range c.Tutors {
				if tut.Name != "" {
					t := openapi.Tutor{}
					t.Censored = false
					t.CensoredDate = time.Now().Format("2006-01-02")
					t.Email = tut.Email
					t.ThirdPartyKey = tut.ThirdPartyKey
					t.Name = tut.Name
					res = append(res, t)
				}
			}
			return res
		}
	}
	return make([]openapi.Tutor, 0)
}

var CoursesTutorUploadCmd = &cobra.Command{
	Use:   "tutor-upload",
	Short: "lists all courses",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		coursesonServer, _, err := client.DefaultApi.CoursesGet(ctx)
		coursesonServer[0].Clearance = "tutor"
		jsonFile, err := ioutil.ReadFile(args[0])
		if err != nil {
			log.Fatalln(err)
		}
		var courses []openapi.Course
		json.Unmarshal(jsonFile, &courses)
		for _, course := range coursesonServer {
			tutors := findAndFilterTutors(courses, course)
			if len(tutors) == 0 {
				fmt.Println("WARN: Empty tutors.")
			}
			for _, tut := range tutors {
				client.DefaultApi.CoursesCourseIdTutorsPost(ctx, course.Id, tut)
			}
		}
	},
}

var CoursesStatsCmd = &cobra.Command{
	Use:   "stats",
	Short: "stats all courses",
	Args:  cobra.NoArgs,
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		courses, _, err := client.DefaultApi.CoursesGet(ctx)
		if err != nil {
			log.Fatalln(err)
		}
		total := 0
		summe := 0
		fmt.Println("| Name | Used | Total | Percentage |")
		fmt.Println("| ---- | --- | ---- | -- |")
		for _, f := range courses {
			m, _, _ := client.DefaultApi.ModulesModuleIdGet(ctx, f.ModuleId)

			stats, _, _ := client.DefaultApi.CoursesCourseIdStatsGet(ctx, f.Id)
			used := int(stats.Questionnaires)
			fmt.Printf("| %s | %d | %d | %.2f |\n", m.Name, used, f.NumberOfStudents, 100*float32(used)/float32(f.NumberOfStudents))
			summe += int(f.NumberOfStudents)
			total += used
		}
		fmt.Println("| ---- | --- | ---- | --- |")
		fmt.Printf("| Summe | %d | %d | %.2f |\n", total, summe, 100*float32(total)/float32(summe))
	},
}
