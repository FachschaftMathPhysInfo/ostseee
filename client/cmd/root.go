package cmd

import (
	"context"
	"fmt"
	"os"

	"github.com/fachschaftmathphys/ostseee/client/openapi"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	// Used for flags.
	cfgFile string
)
var rootCmd = &cobra.Command{
	Use:   "ostseee-client",
	Short: "Ostseee client is a powerful cli to the ostseee.",
	Long:  ``,
	Run: func(cmd *cobra.Command, args []string) {
		// Do Stuff Here

	},
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number of ostseee",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("ostseee-client v.0.0.1")
	},
}

func NewAPIClient() *openapi.APIClient {
	cfg := openapi.NewConfiguration()
	cfg.Scheme = viper.GetString("scheme")
	cfg.Host = viper.GetString("host")
	cfg.BasePath = viper.GetString("basepath")
	client := openapi.NewAPIClient(cfg)
	return client
}

var termsListCmd = &cobra.Command{
	Use:   "list",
	Short: "Print the terms of ostseee",
	Run: func(cmd *cobra.Command, args []string) {
		client := NewAPIClient()
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		terms, _, err := client.DefaultApi.TermsGet(ctx)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		for _, term := range terms {
			fmt.Println("ID: ", term.Id)
			fmt.Println("Name: ", term.Name)
			fmt.Println("Begin: ", term.Begin)
			fmt.Println("End: ", term.End)
		}
	},
}
var termsCmd = &cobra.Command{
	Use:   "terms",
	Short: "Commands regarding terms",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("terms")
	},
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.ostseee-client.yaml)")
	//scheme   string
	//host     string
	//basePath string
	rootCmd.PersistentFlags().String("scheme", "https", "Transport scheme")
	rootCmd.PersistentFlags().String("host", "eval.mathphys.info", "Host of ostseee")
	rootCmd.PersistentFlags().String("basepath", "v1", "BasePath")
	rootCmd.PersistentFlags().String("basic_user", "admin", "Used to login")
	rootCmd.PersistentFlags().String("basic_pw", "password", "Used to login (password)")
	MailCmd.PersistentFlags().String("smtp", "localhost:1025", "SMTP server used for mailing")
	ReportCmd.PersistentFlags().StringVar(&Locale, "locale", "de", "Locale to render")
	viper.BindPFlag("scheme", rootCmd.PersistentFlags().Lookup("scheme"))
	viper.BindPFlag("host", rootCmd.PersistentFlags().Lookup("host"))
	viper.BindPFlag("basepath", rootCmd.PersistentFlags().Lookup("basepath"))

	viper.BindPFlag("basic_user", rootCmd.PersistentFlags().Lookup("basic_user"))
	viper.BindPFlag("basic_pw", rootCmd.PersistentFlags().Lookup("basic_pw"))

	viper.BindPFlag("smtp", MailCmd.PersistentFlags().Lookup("smtp"))

	rootCmd.AddCommand(versionCmd)
	termsCmd.AddCommand(termsListCmd)
	rootCmd.AddCommand(termsCmd)
	ReportCmd.AddCommand(ReportTutorCmd)
	ReportCmd.AddCommand(ReportCourseCmd)
	rootCmd.AddCommand(ReportCmd)
	MailCmd.AddCommand(MailTermCmd)
	FormsCmd.AddCommand(FormsValidateCmd)
	FormsCmd.AddCommand(FormsListCmd)
	FormsCmd.AddCommand(FormsUpdateCmd)
	FormsCmd.AddCommand(FormsGetCmd)
	rootCmd.AddCommand(FormsCmd)
	CoursesCmd.AddCommand(CoursesListCmd)
	CoursesCmd.AddCommand(CoursesTutorUploadCmd)
	rootCmd.AddCommand(CoursesCmd)
	rootCmd.AddCommand(MailCmd)
}

func er(msg interface{}) {
	fmt.Println("Error:", msg)
	os.Exit(1)
}

func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		// Find home directory.
		home, err := os.UserHomeDir()
		if err != nil {
			er(err)
		}

		// Search config in home directory with name ".ostseee-client" (without extension).
		viper.AddConfigPath(home)
		viper.SetConfigName(".ostseee-client")
	}

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err == nil {
		fmt.Println("Using config file:", viper.ConfigFileUsed())
	}
}
