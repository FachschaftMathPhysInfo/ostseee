package cmd

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
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
