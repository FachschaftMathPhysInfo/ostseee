package cmd

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"github.com/antihax/optional"
	"github.com/fachschaftmathphys/ostseee/client/openapi"
	uuid "github.com/satori/go.uuid"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

var TermCmd = &cobra.Command{
	Use:   "term",
	Short: "Terms specific commands",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("call export")
	},
}

func containsReport(reps []openapi.CourseReport, id string) bool {
	for _, r := range reps {
		if r.Id == id {
			return true
		}
	}
	return false
}

type ExportColumnDefinition struct {
	ShortCode string  `json: "shortcode"`
	Shift     int     `json: "shift,omitempty"`
	Dev       bool    `json: "dev,omitempty"`
	Avg       bool    `json: "avg,omitempty"`
	Positions []int32 `json: "positions"`
}
type ExportDefinition struct {
	ExportColumns     []ExportColumnDefinition `json:"columns"`
	LVBI              bool                     `json: "lvbi,omitempty"`
	ShortCodesForLVBI []string                 `json: "shortcodesForLVBI,omitempty"`
	//only supported value is "heidelberg"
	LVBIMode string `json:"lvbi_mode,omitempty"`
}

func findResultByShortCode(rs []openapi.ResultSection, shortCode string) (openapi.Result, error) {
	for _, rSection := range rs {
		for _, r := range rSection.Results {
			if r.Shortcode == shortCode {
				return r, nil
			}
		}
	}
	return openapi.Result{}, fmt.Errorf("Shortcode must be present over all courses.")
}

func findPosition(values []openapi.ResultPair, val int32) (openapi.ResultPair, error) {
	for i, v := range values {
		if val == int32(i) {
			return v, nil
		}
	}
	return openapi.ResultPair{}, fmt.Errorf("Value must be present over all courses.")
}

func contains(coll []string, s string) bool {
	for _, c := range coll {
		if c == s {
			return true
		}
	}
	return false
}

var TermsExportCmd = &cobra.Command{
	Use:   "export",
	Short: "exports all data defined by input flag -i to first argument.",
	Args:  cobra.ExactArgs(2),
	Run: func(cmd *cobra.Command, args []string) {
		log.Println("This function uses the .cache folder!")
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		var client *openapi.APIClient
		client = NewAPIClient()
		var err error
		termId := args[0]
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		//load schema definition
		file, _ := ioutil.ReadFile(viper.GetString("i"))
		exportDefinition := ExportDefinition{}
		_ = json.Unmarshal([]byte(file), &exportDefinition)
		header := make([]string, 0)
		header = append(header, "Vorlesung")
		header = append(header, "DozentInnen")

		for _, column := range exportDefinition.ExportColumns {
			if column.Avg {
				header = append(header, column.ShortCode+"_avg")
			}
			if column.Dev {
				header = append(header, column.ShortCode+"_dev")
			}
			for _, p := range column.Positions {
				header = append(header, column.ShortCode+"_val_"+fmt.Sprint(p))
			}
		}
		if exportDefinition.LVBI {
			header = append(header, "LVBI")
		}
		//now write header
		outputfile, err := os.OpenFile(args[1], os.O_CREATE|os.O_WRONLY, 0777)
		csvWriter := csv.NewWriter(outputfile)
		csvWriter.Write(header)
		courses, _, _ := client.DefaultApi.CoursesGet(ctx)
		//create cache dir
		os.MkdirAll(".cache", os.ModePerm)
		for _, course := range courses {
			if course.TermId == termId {
				var cr openapi.CourseReport
				filename := ".cache/" + course.Id
				_, err := os.Stat(filename)
				if os.IsNotExist(err) {
					//File doesnot exists
					log.Println("Caching")
					cr, _, _ = client.DefaultApi.CoursesCourseIdReportGet(ctx, course.Id)
					data, _ := json.MarshalIndent(cr, "", " ")
					ioutil.WriteFile(filename, data, 0644)
				} else {
					log.Println("Using cache")
					file, _ := ioutil.ReadFile(filename)
					_ = json.Unmarshal([]byte(file), &cr)
				}

				log.Println(cr.Id)
				entry := make([]string, 0)
				course_profs, _, _ := client.DefaultApi.CourseprofsGet(ctx, &openapi.CourseprofsGetOpts{CourseId: optional.NewString(course.Id)})

				m, _, _ := client.DefaultApi.ModulesModuleIdGet(ctx, course.ModuleId)
				entry = append(entry, m.Name)
				cps := make([]string, 0)
				for _, c := range course_profs {
					p, _, _ := client.DefaultApi.ProfsProfIdGet(ctx, c.ProfId)
					cps = append(cps, p.Lastname+", "+p.Firstname)
				}
				entry = append(entry, strings.Join(cps, "; "))

				if cr.CourseId != fmt.Sprint(uuid.Nil) && cr.CourseId != "" {
					lvbi := 0.0
					for _, column := range exportDefinition.ExportColumns {
						result, err := findResultByShortCode(cr.Sections, column.ShortCode)
						if err != nil {
							if column.Avg {
								entry = append(entry, "err")
							}
							if column.Dev {
								entry = append(entry, "err")
							}
							for _, p := range column.Positions {
								entry = append(entry, "err"+fmt.Sprint(p))
							}

						}
						if column.Avg {
							entry = append(entry, fmt.Sprint(result.Avg+float32(column.Shift)))
							avg := result.Avg + float32(column.Shift)
							if contains(exportDefinition.ShortCodesForLVBI, column.ShortCode) {
								//This is for the 5 core questions
								if exportDefinition.LVBIMode == "heidelberg" {
									part := (4.0 - float64(avg)) / 2.0
									if avg <= 2.0 {
										part = 1.0
									} else if avg > 4.0 {
										part = 0.0
									}
									lvbi += part * 0.2
								} else {
									log.Println("Warn: Unknown Calculation mode '", exportDefinition.LVBIMode, "' found.")
								}
							}
						}
						if column.Dev {
							entry = append(entry, fmt.Sprint(result.Stddev))
						}
						for _, p := range column.Positions {
							resultpair, err := findPosition(result.Values, p)
							if err != nil {
								log.Println(err)
								log.Println("[More info] Shortcode:", column.ShortCode, " Pos:", p, " Name:", m.Name, "(", course.Id, ")")
								entry = append(entry, "err")
							} else {
								entry = append(entry, resultpair.Value)
							}
						}
					}
					if exportDefinition.LVBI {
						entry = append(entry, fmt.Sprint(lvbi))
					}
				} else {
					entry = append(entry, "Less than five participants.")
				}
				csvWriter.Write(entry)
			}
		}

		csvWriter.Flush()
	},
}
