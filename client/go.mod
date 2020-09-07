module github.com/fachschaftmathphys/ostseee/client

go 1.14

require (
	github.com/Ambrevar/blackfriday-latex v0.0.0-20171128113613-dc387d576233
	github.com/antihax/optional v1.0.0
	github.com/jordan-wright/email v0.0.0-20200602115436-fd8a7622303e
	github.com/matcornic/hermes/v2 v2.1.0
	github.com/russross/blackfriday/v2 v2.0.1
	github.com/satori/go.uuid v1.2.0
	github.com/spf13/cobra v1.0.0
	github.com/spf13/viper v1.4.0
	gitlab.com/ambrevar/blackfriday-latex v0.0.0-20171128113613-dc387d576233
	golang.org/x/oauth2 v0.0.0-20200107190931-bf48bf16ab8d
	gopkg.in/russross/blackfriday.v2 v2.0.1

)

replace gopkg.in/russross/blackfriday.v2 v2.0.1 => github.com/russross/blackfriday/v2 v2.0.1
