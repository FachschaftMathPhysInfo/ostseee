package cmd

import (
	"context"
	"fmt"
	"log"
	"net/smtp"
	"net/textproto"
	"strings"

	"github.com/antihax/optional"
	"github.com/fachschaftmathphys/ostseee/client/openapi"
	emailTool "github.com/jordan-wright/email"
	"github.com/matcornic/hermes/v2"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var MailTermCmd = &cobra.Command{
	Use:   "term",
	Short: "Emails information to all profs in specific term. Second arg is your name",
	Args:  cobra.ExactArgs(2),
	Run: func(cmd *cobra.Command, args []string) {
		termId := args[0]
		name := args[1]
		fmt.Println(termId)
		h := hermes.Hermes{
			// Optional Theme
			// Theme: new(Default)
			Product: hermes.Product{
				// Appears in header & footer of e-mails
				Name: name,
				Link: "https://mathphys.stura.uni-heidelberg.de/w/evaluation-und-lehrpreis/",
				// Optional product logo
				Logo:        "https://mathphys.stura.uni-heidelberg.de/w/wp-content/uploads/2020/07/evallogo.png",
				Copyright:   "(c) 2020 Evaluationsteam der Fachschaft MathPhysInfo im Auftrag der Fakultät für Physik und Astronomie",
				TroubleText: "Wenn der {ACTION}-Button nicht funktioniert, nutze folgenden Link:",
			},
		}
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		term, _, err := client.DefaultApi.TermsTermIdGet(ctx, termId)
		if err != nil {
			fmt.Println("error:", err)
			return
		}
		courses, _, err := client.DefaultApi.CoursesGet(ctx)
		if err != nil {
			fmt.Println("error:", err)
			return
		}
		for _, c := range courses {
			if c.TermId == termId {
				courseProfs, _, err := client.DefaultApi.CourseprofsGet(ctx, &openapi.CourseprofsGetOpts{CourseId: optional.NewString(c.Id)})
				if err != nil {
					fmt.Println("error:", err)
					return
				}
				if len(courseProfs) == 0 {
					log.Println("Warning: No Profs", c.Id)
				}
				mails := make([]string, len(courseProfs))
				names := make([]string, len(courseProfs))
				profs := make([]openapi.Prof, len(courseProfs))
				for i, cp := range courseProfs {
					profs[i], _, _ = client.DefaultApi.ProfsProfIdGet(ctx, cp.ProfId)
					mails[i] = profs[i].Email
					names[i] = profs[i].Lastname
				}
				tutors, _, _ := client.DefaultApi.CoursesCourseIdTutorsGet(ctx, c.Id)
				tutorsName := make([]string, len(tutors))
				for i, tut := range tutors {
					tutorsName[i] = tut.Name
				}
				tutorsNameJoined := strings.Join(tutorsName, ", ")
				module, _, _ := client.DefaultApi.ModulesModuleIdGet(ctx, c.ModuleId)
				form, _, _ := client.DefaultApi.FormsFormIdGet(ctx, c.FormId)
				isMoodle := strings.Contains(c.ThirdPartyKey, "lti")
				greeting := "Sehr geehrte Dozierende,"
				intros := []string{"In der Woche vom 13. Juli soll die Online-Evaluation durchgeführt werden. Wir senden Ihnen daher nun die Informationen zu Ihrer Veranstaltung zu.",
					"Bitte überprüfen Sie die Daten und senden Sie uns ggf. Korrekturen zu! Besonders wichtig ist, dass die Anzahl der Studierenden ausreichend groß gewählt ist."}
				signature := "Viele Grüße"
				plattform := "Übungsgruppenverwaltung der Physik"
				installInstructions := []string{"Da die Teilnehmer Ihrer Veranstaltung über die Übungsgruppenverwaltung Zugriff auf die Umfrage erhalten, müssen Sie nichts konfigurieren. Bitte weisen Sie die Teilnehmer Ihrer Veranstaltung auf die Evaluation hin.", "Bei weiteren Fragen stehen wir Ihnen gerne zur Verfügung."}
				if isMoodle {
					plattform = "Moodle"
					installInstructions = []string{"Da die Teilnehmer Ihrer Veranstaltung über das Moodle Zugriff auf die Umfrage erhalten, müssen Sie im Moodle ein externes Tool konfigurieren.",
						"1. Aktivieren Sie den Bearbeitungsmodus auf Ihrer Kursseite und klicken Sie auf 'Aktivität oder Material hinzufügen'",
						"2. Wählen Sie 'Externes Tool' unter Aktivitäten aus.",
						"3. Benennen Sie die Aktivität 'Evaluation', wählen Sie unter 'vorkonfiguriertes Tool' den Eintrag 'Evaluation (Physik)' und speichern Sie die Aktivität.",
						"Bitte weisen Sie die Teilnehmer Ihrer Veranstaltung auf die Evaluation hin. Der Zugriff ist nur während der Evaluationswoche möglich. Als Dozent können Sie keine Umfrage durchführen.", "Bei weiteren Fragen stehen wir Ihnen gerne zur Verfügung."}
				}
				if c.Language == "en" {
					intros = []string{
						"During the week of the 13th of July an online evaluation will take place at the faculty of physics and astronomy. In order to guarantee a smooth performance, we are sending you informations about your course.",
						"Please check for errors and report them to us. In particular, please check the number of students."}
					installInstructions = []string{
						"Because participants of your course are going to access their questionnaire via the 'Übungsgruppenverwaltung', you do not have to configure anything. Please notify your participants that there will be an evaluation.",
						"If you have any further questions, please contact us."}
					if isMoodle {
						plattform = "Moodle"
						installInstructions = []string{
							"Because participants of your course are going to access their questionnaire via Moodle, you have to configure an external tool in Moodle.",
							"1. Activate the Editing mode on your courses page and click on 'Add an activity or material' ",
							"2. Select 'external tool' on the left hand side and click 'Add'.",
							"3. Name your activity 'Evaluation', select 'Evaluation (Physik)' in the drop-down menu 'preconfigured Tool' and save the activity. ",

							" Please notify your participants that there will be an evaluation. The questionnaire is only aviable during the week. As a lecturer you are not allowed to participate.", "If you have additional questions, do not hesitate to contact us."}
					}
					signature = "Kind regards"
					greeting = "Dear lecturer(s),"
				}
				dict := []hermes.Entry{
					{Key: "Veranstaltung", Value: module.Name},
					{Key: "Dozenten", Value: strings.Join(names, ", ")},
					{Key: "Tutoren", Value: tutorsNameJoined},
					{Key: "Anzahl Studierender", Value: fmt.Sprint(c.NumberOfStudents)},
					{Key: "Umfragebogen", Value: fmt.Sprint(form.Name)},
					{Key: "Zugangsweg", Value: fmt.Sprint(plattform)},
				}
				if c.Language == "en" {
					dict = []hermes.Entry{
						{Key: "course", Value: module.Name},
						{Key: "lecturer(s)", Value: strings.Join(names, ", ")},
						{Key: "tutors", Value: tutorsNameJoined},
						{Key: "Number of students", Value: fmt.Sprint(c.NumberOfStudents)},
						{Key: "questionnaire type", Value: fmt.Sprint(form.Name)},
						{Key: "platform", Value: fmt.Sprint(plattform)},
					}
				}
				email := hermes.Email{
					Body: hermes.Body{
						Intros:     intros,
						Dictionary: dict,
						Title:      greeting,
						Signature:  signature,
						Actions:    []hermes.Action{},
						Outros:     installInstructions,
					},
				}
				emailText, _ := h.GeneratePlainText(email)
				emailBody, _ := h.GenerateHTML(email)
				var a smtp.Auth
				e := &emailTool.Email{
					To:      mails,
					From:    "evaluation@mathphys.stura.uni-heidelberg.de",
					Cc:      []string{"evaluation@mathphys.stura.uni-heidelberg.de"},
					Subject: "Evaluation SoSe 2020 " + module.Name,
					Text:    []byte(emailText),
					HTML:    []byte(emailBody),
					Headers: textproto.MIMEHeader{},
				}
				errorMail := e.Send(viper.GetString("smtp"), a)
				if errorMail != nil {
					fmt.Println("Mail konnte nicht gesandt werden:", errorMail.Error())
				}
			}
		}
		fmt.Println(term.Name)
	},
}

var MailCmd = &cobra.Command{
	Use:   "mail",
	Short: "Emails information",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("call with term")
	},
}
