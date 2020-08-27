package cmd

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/fachschaftmathphys/ostseee/client/openapi"
	uuid "github.com/satori/go.uuid"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var FormsValidateCmd = &cobra.Command{
	Use:   "validate",
	Short: "Validates the supplied form.",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		formId := args[0]
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		form, _, err := client.DefaultApi.FormsFormIdGet(ctx, formId)
		if err != nil {
			log.Fatalln(err)
		}
		if form.TermId == uuid.Nil.String() {
			log.Println("Warn: termId not set")
		}
		pages := form.AbstractForm.Pages
		if len(pages) == 0 {
			log.Println("Warn: len(pages) == 0")
		}
		for _, p := range pages {
			if len(p.Sections) == 0 {
				log.Println("Warn: empty page")
			}
			for _, s := range p.Sections {
				if len(s.Questions) == 0 {
					log.Println("Warn: empty section ", s.Title)
				}
				for _, q := range s.Questions {
					//TODO check whether q  bools are correct
					options := make(map[int32]int)
					for _, o := range q.Options {
						if options[o.Value] != 0 {
							fmt.Println("[", o.Id, "] Warn: Value is duplicate! Value:", o.Value, " Label:", o.Label, " Question:", q.Title, " Section:", s.Title)
						}
						options[o.Value] = options[o.Value] + 1
					}
				}
			}
		}
	},
}
var FormsGetCmd = &cobra.Command{
	Use:   "get",
	Short: "gets a form and prints it as json",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		formId := args[0]
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		form, _, err := client.DefaultApi.FormsFormIdGet(ctx, formId)
		if err != nil {
			log.Fatalln(err)
		}
		json, err := json.Marshal(form)
		if len(args) > 1 {
			err := ioutil.WriteFile(args[1], json, 0644)
			if err != nil {
				panic(err)
			}
		}
		fmt.Println(string(json))
	},
}
var FormsUpdateCmd = &cobra.Command{
	Use:   "update",
	Short: "updates a form by file",
	Args:  cobra.ExactArgs(2),
	Run: func(cmd *cobra.Command, args []string) {
		formId := args[0]
		jsonFile, err := ioutil.ReadFile(args[1])
		if err != nil {
			log.Fatalln(err)
		}
		var form openapi.Form
		json.Unmarshal(jsonFile, &form)
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		f, _, err := client.DefaultApi.FormsFormIdPatch(ctx, formId, form)
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Println(f)
	},
}
var FormsListCmd = &cobra.Command{
	Use:   "list",
	Short: "lists all forms",
	Args:  cobra.NoArgs,
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		forms, _, err := client.DefaultApi.FormsGet(ctx)
		if err != nil {
			log.Fatalln(err)
		}
		for _, f := range forms {
			fmt.Printf("[%s] %s\n", f.Id, f.Name)
		}
	},
}
var FormsCmd = &cobra.Command{
	Use:   "forms",
	Short: "All about forms",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("call with term")
	},
}
