package cmd

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/smtp"
	"net/textproto"
	"strings"
	"time"

	"github.com/antihax/optional"
	"github.com/fachschaftmathphys/ostseee/client/openapi"
	emailTool "github.com/jordan-wright/email"
	"github.com/matcornic/hermes/v2"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var MailTermCmd = &cobra.Command{
	Use:   "term <termID> <name>",
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

				module, _, _ := client.DefaultApi.ModulesModuleIdGet(ctx, c.ModuleId)
				if len(courseProfs) == 0 {
					log.Println("Warning: No Profs", c.Id)
					log.Println(module.Name)
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
				form, _, _ := client.DefaultApi.FormsFormIdGet(ctx, c.FormId)
				isMoodle := strings.Contains(c.ThirdPartyKey, "lti")
				greeting := "Sehr geehrte Dozierende,"
				intros := []string{"In der Woche vom 13. Juli soll die Online-Evaluation durchgeführt werden. Wir senden Ihnen daher nun die Informationen zu Ihrer Veranstaltung zu.",
					"Bitte überprüfen Sie die Daten und senden Sie uns ggf. Korrekturen zu! Besonders wichtig ist, dass die Anzahl der Studierenden ausreichend groß gewählt ist und alle Tutoren (falls vorhanden) aufgelistet sind. Sollten Sie sie selbst eine Übungsgruppe halten, so müssen Sie unter Tutoren aufgelistet sein."}
				signature := "Viele Grüße"
				plattform := "Übungsgruppenverwaltung der Physik"
				installInstructions := []string{"Da die Teilnehmer Ihrer Veranstaltung über die Übungsgruppenverwaltung Zugriff auf die Umfrage erhalten, müssen Sie nichts konfigurieren. Bitte weisen Sie die Teilnehmer Ihrer Veranstaltung auf die Evaluation hin.", "Bei weiteren Fragen stehen wir Ihnen gerne zur Verfügung."}
				if isMoodle {
					plattform = "Moodle"
					installInstructions = []string{"Da die Teilnehmer Ihrer Veranstaltung über das Moodle Zugriff auf die Umfrage erhalten, müssen Sie im Moodle ein externes Tool konfigurieren.",
						"1. Aktivieren Sie den Bearbeitungsmodus auf Ihrer Kursseite und klicken Sie auf 'Aktivität oder Material hinzufügen'",
						"2. Wählen Sie 'Externes Tool' unter Aktivitäten aus.",
						"3. Benennen Sie die Aktivität 'Evaluation', wählen Sie unter 'vorkonfiguriertes Tool' den Eintrag 'Evaluation (Physik)' und speichern Sie die Aktivität.",
						"Bitte weisen Sie die Teilnehmer Ihrer Veranstaltung auf die Evaluation hin. Der Zugriff ist nur während der Evaluationswoche möglich über das Moodle möglich, die Studierenden müssen also in Ihrem Kurs eingetragen sein. Als Dozent können Sie keine Umfrage durchführen.", "Bei weiteren Fragen stehen wir Ihnen gerne zur Verfügung."}
				}
				if c.Language == "en" {
					intros = []string{
						"During the week of the 13th of July an online evaluation will take place at the department of physics and astronomy. In order to guarantee a smooth performance, we are sending you information about your course.",
						"Please check it for errors and report them to us. In particular, please check the number of students and whether all tutors are listed. If you are offering a tutorium yourself, you have to be listed among the tutors, too. "}
					installInstructions = []string{
						"Because participants of your course are going to access their questionnaire via the 'Übungsgruppenverwaltung', you do not have to configure anything. Please notify your participants that there will be an evaluation and that they have to be signed up to take the survey. The questionnaire is only available during the week. As a lecturer you cannot participate.",
						"If you have any further questions, please contact us."}
					if isMoodle {
						plattform = "Moodle"
						installInstructions = []string{
							"Because participants of your course are going to access their questionnaire via Moodle, you have to configure an external tool in Moodle.",
							"1. Activate the Editing mode on your courses page and click on 'Add an activity or material' ",
							"2. Select 'external tool' on the left hand side and click 'Add'.",
							"3. Name your activity 'Evaluation', select 'Evaluation (Physik)' in the drop-down menu 'preconfigured Tool' and save the activity. ",

							" Please notify your participants that there will be an evaluation and that they have to be signed up to take the survey. The questionnaire is only available during the week. As a lecturer you cannot participate.",
							"If you have additional questions, do not hesitate to contact us."}
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
					fmt.Println("Mail", module.Name, " konnte nicht gesandt werden:", errorMail.Error())
				}
			}
		}
		fmt.Println(term.Name)
	},
}

var MailTermResultsCourseCmd = &cobra.Command{
	Use:   "term_results_course",
	Short: "Emails information that results are aviable to all profs in specific term. Second arg is your name",
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

				module, _, _ := client.DefaultApi.ModulesModuleIdGet(ctx, c.ModuleId)
				if len(courseProfs) == 0 {
					log.Println("Warning: No Profs", c.Id)
					log.Println(module.Name)
				}
				mails := make([]string, len(courseProfs))
				names := make([]string, len(courseProfs))
				profs := make([]openapi.Prof, len(courseProfs))
				for i, cp := range courseProfs {
					profs[i], _, _ = client.DefaultApi.ProfsProfIdGet(ctx, cp.ProfId)
					mails[i] = profs[i].Email
					names[i] = profs[i].Lastname
				}
				greeting := "Sehr geehrte Dozierende,"
				intros := []string{"Die Fachschaft hat dieses Semester in Ihrer Veranstaltung " + module.Name + " eine Veranstaltungsumfrage durchgeführt."}
				outros := []string{"Sollten Sie keine Evaluationsergebnisse angezeigt bekommen, schicken Sie uns bitte eine Mail inklusive Ihrer UniID, damit wir die Zugriffsrechte überprüfen und gegebenenfalls anpassen können.",
					"Die Tutor*innen finden ihre Ergebnisse ebenfalls in der Übungsgruppenverwaltung, sie wurden darüber per Mail informiert.",
					"Wenn Sie Anmerkungen, Fragen und Wünsche zur Evaluation haben zögern Sie bitte nicht, uns zu kontaktieren."}
				signature := "Viele Grüße"
				if c.Language == "en" {
					intros = []string{
						"During the week of the 13th of July an online evaluation took place at the department of physics and astronomy."}
					signature = "Kind regards"
					greeting = "Dear lecturer(s),"
					outros = []string{"If you cannot see your report(s), please email us your uniid and we will resolve this problem.",
						"Exercise group teachers received a seperate mail announcing the results.",
						"If you have additional questions, do not hesitate to contact us."}
				}
				actions := []hermes.Action{{
					Instructions: "Die Evaluationsergebnisse finden Sie nun in der Übungsgruppenverwaltung personalisiert zugänglich:",
					Button: hermes.Button{
						Color: "#990000", // Optional action button color
						Text:  "Ergebnisse abrufen",
						Link:  viper.GetString("download_center"),
					},
				}}
				if c.Language == "en" {
					actions = []hermes.Action{{
						Instructions: "You can now access your report via the Übungsgruppenverwaltung:",
						Button: hermes.Button{
							Color: "#990000", // Optional action button color
							Text:  "View results",
							Link:  viper.GetString("download_center"),
						},
					}}
				}
				email := hermes.Email{
					Body: hermes.Body{
						Intros:    intros,
						Title:     greeting,
						Signature: signature,
						Actions:   actions,
						Outros:    outros,
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
					fmt.Println("Mail", module.Name, " konnte nicht gesandt werden:", errorMail.Error())
				}
			}
		}
		fmt.Println(term.Name)
	},
}

var MailTermResultsTutorsCmd = &cobra.Command{
	Use:   "term_results_tutors",
	Short: "Emails information to all tutors in specific term. Second arg is your name",
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

				tutors, _, err := client.DefaultApi.CoursesCourseIdTutorsGet(ctx, c.Id)
				if err != nil {
					fmt.Println("error:", err)
					return
				}

				module, _, _ := client.DefaultApi.ModulesModuleIdGet(ctx, c.ModuleId)
				mails := make([]string, 1)

				greeting := "Liebe Tutorin, lieber Tutor,"
				intros := []string{"Die Fachschaft hat dieses Semester in der Veranstaltung " + module.Name + " eine Veranstaltungsumfrage durchgeführt , im Rahmen dessen wurden auch die Tutorien evaluiert."}
				outros := []string{"Sollten Sie keine Evaluationsergebnisse angezeigt bekommen, schicken Sie uns bitte eine Mail inklusive Ihrer UniID, damit wir die Zugriffsrechte überprüfen und gegebenenfalls anpassen können.",
					"Wenn Sie Anmerkungen, Fragen und Wünsche zur Evaluation haben zögern Sie bitte nicht, uns zu kontaktieren."}
				signature := "Viele Grüße"
				if c.Language == "en" {
					intros = []string{
						"During the week of the 13th of July an online evaluation took place at the department of physics and astronomy."}
					signature = "Kind regards"
					greeting = "Dear tutor,"
					outros = []string{"If you cannot see your report(s), please email us your uniid and we will resolve this problem.",
						"If you have additional questions, do not hesitate to contact us."}
				}
				actions := []hermes.Action{{
					Instructions: "Die Evaluationsergebnisse finden Sie nun in der Übungsgruppenverwaltung personalisiert zugänglich:",
					Button: hermes.Button{
						Color: "#990000", // Optional action button color
						Text:  "Ergebnisse abrufen",
						Link:  viper.GetString("download_center"),
					},
				}}
				if c.Language == "en" {
					actions = []hermes.Action{{
						Instructions: "You can now access your report via the Übungsgruppenverwaltung:",
						Button: hermes.Button{
							Color: "#990000", // Optional action button color
							Text:  "View results",
							Link:  viper.GetString("download_center"),
						},
					}}
				}
				email := hermes.Email{
					Body: hermes.Body{
						Intros:    intros,
						Title:     greeting,
						Signature: signature,
						Actions:   actions,
						Outros:    outros,
					},
				}
				emailText, _ := h.GeneratePlainText(email)
				emailBody, _ := h.GenerateHTML(email)
				for i := range tutors {
					mails[0] = tutors[i].Email

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
						fmt.Println("Mail", module.Name, "an ", tutors[i].Name, " konnte nicht gesandt werden:", errorMail.Error())
					}
				}
			}
		}
		fmt.Println(term.Name)
	},
}

var MailParticipantsCmd = &cobra.Command{
	Use:   "participants",
	Short: "Emails information to all participants in course. Third arg is your name",
	Args:  cobra.ExactArgs(3),
	Run: func(cmd *cobra.Command, args []string) {
		courseId := args[0]
		name := args[2]
		fmt.Println(courseId)
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
		course, _, err := client.DefaultApi.CoursesCourseIdGet(ctx, courseId)
		if err != nil {
			fmt.Println("error:", err)
			return
		}
		invs, _, err := client.DefaultApi.CoursesCourseIdInvitationsGet(ctx, course.Id, viper.GetTime("begin"), viper.GetTime("end"))
		if err != nil {
			fmt.Println("error:", err)
			return
		}
		tns, _ := ioutil.ReadFile(args[1])
		participants := strings.Split(string(tns), "\n")
		rand.Seed(time.Now().UnixNano())
		rand.Shuffle(len(participants), func(i, j int) { participants[i], participants[j] = participants[j], participants[i] })
		if len(invs) < len(participants) {
			log.Println(len(invs), len(participants))
			log.Panic("too few invitations")
		}
		module, _, _ := client.DefaultApi.ModulesModuleIdGet(ctx, course.ModuleId)
		for i, tn := range participants {

			courseProfs, _, err := client.DefaultApi.CourseprofsGet(ctx, &openapi.CourseprofsGetOpts{CourseId: optional.NewString(courseId)})
			if err != nil {
				log.Panic(err)
			}
			if len(courseProfs) == 0 {
				log.Println("Warning: No Profs", courseId)
				log.Println(module.Name)
			}
			mails := make([]string, 1)
			mails[0] = tn
			names := make([]string, len(courseProfs))
			profs := make([]openapi.Prof, len(courseProfs))
			for i, cp := range courseProfs {
				profs[i], _, _ = client.DefaultApi.ProfsProfIdGet(ctx, cp.ProfId)
				names[i] = profs[i].Lastname
			}
			greeting := "Sehr geehrte TeilnehmerIn,"
			intros := []string{"In der Woche vom 13. Juli soll eine Online-Evaluation an der Fakultät für Physik und Astronomie durchgeführt werden."}
			signature := "Viele Grüße"
			outros := []string{"Vielen Dank für Deine Teilnahme.", "Eine Zuordnung zwischen Link und Abgabe ist nicht möglich. Deine Emailadresse wurde nur für dieses Anschreiben verwendet und dannach gelöscht.", "Solltest Du weitere Fragen haben, schreibe uns doch eine Email evaluation@mathphys.stura.uni-heidelberg.de."}
			if course.Language == "en" {
				intros = []string{
					"During the week of the 13th of July an online evaluation will take place at the department of physics and astronomy. Use the following link (useable between 0:00 13th July and 23:59 19th of July) to evaluate the lecture " + module.Name + " by " + strings.Join(names, ", ") + "."}
				outros = []string{"Thank you for participating. If you have further questions, write us an email evaluation@mathphys.stura.uni-heidelberg.de."}
				signature = "Kind regards"
				greeting = "Dear participant,"
			}
			email := hermes.Email{
				Body: hermes.Body{
					Intros:    intros,
					Title:     greeting,
					Signature: signature,
					Actions: []hermes.Action{{
						Instructions: "Benutze folgenden Link (verwendbar im Zeitraum vom 13. Juli 0:00 bis 19. Juli 23:59), um die Veranstaltung " + module.Name + " bei " + strings.Join(names, ", ") + " zu evaluieren:",
						Button: hermes.Button{
							Color: "#990000", // Optional action button color
							Text:  "Evaluation durchführen",
							Link:  viper.GetString("base_url") + invs[i].Id,
						},
					}},
					Outros: outros,
				},
			}
			emailText, _ := h.GeneratePlainText(email)
			emailBody, _ := h.GenerateHTML(email)
			var a smtp.Auth
			e := &emailTool.Email{
				To:      mails,
				From:    "evaluation@mathphys.stura.uni-heidelberg.de",
				Subject: "Evaluation SoSe 2020 " + module.Name,
				Text:    []byte(emailText),
				HTML:    []byte(emailBody),
				Headers: textproto.MIMEHeader{},
			}
			errorMail := e.Send(viper.GetString("smtp"), a)
			if errorMail != nil {
				fmt.Println("Mail", module.Name, " konnte nicht gesandt werden:", errorMail.Error())
				log.Println(tn)
			}
		}

	},
}

var MailCmd = &cobra.Command{
	Use:   "mail",
	Short: "Emails information",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("call with term")
	},
}
