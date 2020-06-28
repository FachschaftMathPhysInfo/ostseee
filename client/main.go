package main

import (
	//openapi "./openapi"
	"github.com/fachschaftmathphys/ostseee/client/cmd"
)

func main() {
	/*cfg := openapi.NewConfiguration()
	cfg.Scheme = "http"
	cfg.Host = "localhost:8080"
	client := openapi.NewAPIClient(cfg)
	fmt.Println(client.DefaultApi.TermsGet(context.TODO()))*/
	cmd.Execute()
}
