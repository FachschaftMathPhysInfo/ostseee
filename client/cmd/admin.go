package cmd

import (
	"context"
	"fmt"
	"os"

	"github.com/fachschaftmathphys/ostseee/client/openapi"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"golang.org/x/crypto/ssh/terminal"
)

var AdminCmd = &cobra.Command{
	Use:   "admin",
	Short: "All about administration of users etc",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("call with a task")
	},
}

var AdminUsersCmd = &cobra.Command{
	Use:   "users",
	Short: "All about users",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("call with a task")
	},
}

var AdminUsersListCmd = &cobra.Command{
	Use:   "list",
	Short: "List all users",
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		users, _, _ := client.DefaultApi.UsersGet(ctx)
		fmt.Println("userName | firstName | lastName")
		for _, u := range users {
			fmt.Printf("%s | %s | %s \n", u.UserName, u.FirstName, u.LastName)
		}
	},
}

var AdminUsersAddCmd = &cobra.Command{
	Use:   "add",
	Short: "Add/edit  a user ( call with username, first, last name). Works only with admin account",
	Args:  cobra.ExactArgs(3),
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.WithValue(cmd.Context(), openapi.ContextBasicAuth, openapi.BasicAuth{UserName: viper.GetString("basic_user"), Password: viper.GetString("basic_pw")})
		client := NewAPIClient()
		fmt.Print("Enter password: ")
		password, err := terminal.ReadPassword(0)
		if err != nil {
			fmt.Println("Err:", err)
			os.Exit(1)
		}
		fmt.Println()
		fmt.Print("Repeat password: ")
		passwordRepeat, err := terminal.ReadPassword(0)
		if err != nil {
			fmt.Println("Err:", err)
			os.Exit(1)
		}
		if string(password) != string(passwordRepeat) {
			fmt.Println("Password mismatch")
			os.Exit(1)
		}
		user, _, _ := client.DefaultApi.UsersPost(ctx, openapi.User{Password: string(password), UserName: args[0], FirstName: args[1], LastName: args[2]})
		fmt.Println(user.UserName, " created")
	},
}
