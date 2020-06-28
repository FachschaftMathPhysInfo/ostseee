package client

import (
	"context"
	"fmt"

	//openapi "./openapi"
	"github.com/fachschaftmathphys/ostseee/client/openapi"
)

func main() {
	cfg := openapi.NewConfiguration()
	cfg.Host = "localhost"
	client := openapi.NewAPIClient(cfg)
	fmt.Println(client.DefaultApi.TermsGet(context.TODO()))
}
