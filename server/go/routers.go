/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	"log"
	"net/http"
	"os"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

// Route is the information for every URI.
type Route struct {
	// Name is the name of this Route.
	Name string
	// Method is the string for the HTTP method. ex) GET, POST etc..
	Method string
	// Pattern is the pattern of the URI.
	Pattern string
	// HandlerFunc is the handler function of this route.
	HandlerFunc gin.HandlerFunc
}

// Routes is the list of the generated Route.
type Routes []Route

// NewRouter returns a new router.
func NewRouter(Db *gorm.DB) *gin.Engine {
	evalAPI := initEvalAPI(Db)
	var unsecuredRoutes = Routes{
		{
			"QuestionaireInvitationIdGet",
			http.MethodGet,
			"/v1/questionaire/:invitationId",
			evalAPI.QuestionaireInvitationIdGet,
		},

		{
			"QuestionaireInvitationIdPost",
			http.MethodPost,
			"/v1/questionaire/:invitationId",
			evalAPI.QuestionaireInvitationIdPost,
		},
		{
			"LTIConfig",
			http.MethodGet,
			"/distributor/lti_config",
			evalAPI.LTIConfig,
		},
		{
			"LTILaunch",
			http.MethodPost,
			"/distributor/lti_launch",
			evalAPI.LTILaunch,
		},
	}
	var securedRoutes = Routes{
		{
			"Index",
			http.MethodGet,
			"/v1/",
			Index,
		},
		{
			"StatusGet",
			http.MethodGet,
			"/v1/status",
			evalAPI.StatusGet,
		},

		{
			"CourseprofsCourseProfIdDelete",
			http.MethodDelete,
			"/v1/courseprofs/:courseProfId",
			evalAPI.CourseprofsCourseProfIdDelete,
		},

		{
			"CourseprofsCourseProfIdGet",
			http.MethodGet,
			"/v1/courseprofs/:courseProfId",
			evalAPI.CourseprofsCourseProfIdGet,
		},

		{
			"CourseprofsCourseProfIdPatch",
			http.MethodPatch,
			"/v1/courseprofs/:courseProfId",
			evalAPI.CourseprofsCourseProfIdPatch,
		},

		{
			"CourseprofsCourseProfIdReportGet",
			http.MethodGet,
			"/v1/courseprofs/:courseProfId/report",
			evalAPI.CourseprofsCourseProfIdReportGet,
		},

		{
			"CourseprofsGet",
			http.MethodGet,
			"/v1/courseprofs",
			evalAPI.CourseprofsGet,
		},

		{
			"CourseprofsPost",
			http.MethodPost,
			"/v1/courseprofs",
			evalAPI.CourseprofsPost,
		},

		{
			"CoursesCourseIdDelete",
			http.MethodDelete,
			"/v1/courses/:courseId",
			evalAPI.CoursesCourseIdDelete,
		},

		{
			"CoursesCourseIdGet",
			http.MethodGet,
			"/v1/courses/:courseId",
			evalAPI.CoursesCourseIdGet,
		},
		{
			"CoursesCourseIdInvitationsSendPost",
			http.MethodPost,
			"/v1/courses/:courseId/invitations/send",
			evalAPI.CoursesCourseIdInvitationsSendPost,
		},
		{
			"CoursesCourseIdInvitationsGet",
			http.MethodGet,
			"/v1/courses/:courseId/invitations",
			evalAPI.CoursesCourseIdInvitationsGet,
		},

		{
			"CoursesCourseIdPatch",
			http.MethodPatch,
			"/v1/courses/:courseId",
			evalAPI.CoursesCourseIdPatch,
		},

		{
			"CoursesCourseIdReportGet",
			http.MethodGet,
			"/v1/courses/:courseId/report",
			evalAPI.CoursesCourseIdReportGet,
		},

		{
			"CoursesCourseIdTutorsGet",
			http.MethodGet,
			"/v1/courses/:courseId/tutors",
			evalAPI.CoursesCourseIdTutorsGet,
		},

		{
			"CoursesCourseIdTutorsPost",
			http.MethodPost,
			"/v1/courses/:courseId/tutors",
			evalAPI.CoursesCourseIdTutorsPost,
		},

		{
			"CoursesCourseIdTutorsTutorIdDelete",
			http.MethodDelete,
			"/v1/courses/:courseId/tutors/:tutorId",
			evalAPI.CoursesCourseIdTutorsTutorIdDelete,
		},

		{
			"CoursesCourseIdTutorsTutorIdGet",
			http.MethodGet,
			"/v1/courses/:courseId/tutors/:tutorId",
			evalAPI.CoursesCourseIdTutorsTutorIdGet,
		},

		{
			"CoursesCourseIdTutorsTutorIdPatch",
			http.MethodPatch,
			"/v1/courses/:courseId/tutors/:tutorId",
			evalAPI.CoursesCourseIdTutorsTutorIdPatch,
		},

		{
			"CoursesCourseIdTutorsTutorIdReportGet",
			http.MethodGet,
			"/v1/courses/:courseId/tutors/:tutorId/report",
			evalAPI.CoursesCourseIdTutorsTutorIdReportGet,
		},

		{
			"CoursesGet",
			http.MethodGet,
			"/v1/courses",
			evalAPI.CoursesGet,
		},

		{
			"CoursesPost",
			http.MethodPost,
			"/v1/courses",
			evalAPI.CoursesPost,
		},

		{
			"FacultiesFacultyIdGet",
			http.MethodGet,
			"/v1/faculties/:facultyId",
			evalAPI.FacultiesFacultyIdGet,
		},

		{
			"FacultiesFacultyIdPatch",
			http.MethodPatch,
			"/v1/faculties/:facultyId",
			evalAPI.FacultiesFacultyIdPatch,
		},

		{
			"FacultiesGet",
			http.MethodGet,
			"/v1/faculties",
			evalAPI.FacultiesGet,
		},

		{
			"FacultiesPost",
			http.MethodPost,
			"/v1/faculties",
			evalAPI.FacultiesPost,
		},

		{
			"FormsFormIdGet",
			http.MethodGet,
			"/v1/forms/:formId",
			evalAPI.FormsFormIdGet,
		},

		{
			"FormsFormIdPatch",
			http.MethodPatch,
			"/v1/forms/:formId",
			evalAPI.FormsFormIdPatch,
		},

		{
			"FormsGet",
			http.MethodGet,
			"/v1/forms",
			evalAPI.FormsGet,
		},

		{
			"FormsPost",
			http.MethodPost,
			"/v1/forms",
			evalAPI.FormsPost,
		},

		{
			"ModulesGet",
			http.MethodGet,
			"/v1/modules",
			evalAPI.ModulesGet,
		},

		{
			"ModulesModuleIdDelete",
			http.MethodDelete,
			"/v1/modules/:moduleId",
			evalAPI.ModulesModuleIdDelete,
		},

		{
			"ModulesModuleIdGet",
			http.MethodGet,
			"/v1/modules/:moduleId",
			evalAPI.ModulesModuleIdGet,
		},

		{
			"ModulesModuleIdPatch",
			http.MethodPatch,
			"/v1/modules/:moduleId",
			evalAPI.ModulesModuleIdPatch,
		},

		{
			"ModulesPost",
			http.MethodPost,
			"/v1/modules",
			evalAPI.ModulesPost,
		},

		{
			"ProfsGet",
			http.MethodGet,
			"/v1/profs",
			evalAPI.ProfsGet,
		},

		{
			"ProfsPost",
			http.MethodPost,
			"/v1/profs",
			evalAPI.ProfsPost,
		},

		{
			"ProfsProfIdDelete",
			http.MethodDelete,
			"/v1/profs/:profId",
			evalAPI.ProfsProfIdDelete,
		},

		{
			"ProfsProfIdGet",
			http.MethodGet,
			"/v1/profs/:profId",
			evalAPI.ProfsProfIdGet,
		},

		{
			"ProfsProfIdPatch",
			http.MethodPatch,
			"/v1/profs/:profId",
			evalAPI.ProfsProfIdPatch,
		},
		{
			"TermsGet",
			http.MethodGet,
			"/v1/terms",
			evalAPI.TermsGet,
		},

		{
			"TermsPost",
			http.MethodPost,
			"/v1/terms",
			evalAPI.TermsPost,
		},

		{
			"TermsTermIdGet",
			http.MethodGet,
			"/v1/terms/:termId",
			evalAPI.TermsTermIdGet,
		},

		{
			"TermsTermIdPatch",
			http.MethodPatch,
			"/v1/terms/:termId",
			evalAPI.TermsTermIdPatch,
		},

		{
			"TermsTermIdReportGet",
			http.MethodGet,
			"/v1/terms/:termId/report",
			evalAPI.TermsTermIdReportGet,
		},
	}

	router := gin.New()
	router.Use(gin.Recovery())
	addRoutes(router, unsecuredRoutes)
	router.Use(gin.Logger()) //Logger for secured lines
	if _, jwtEnabled := os.LookupEnv("JWT_ENABLED"); jwtEnabled {
		authMiddleware := initJWT()
		router.POST("/v1/login", authMiddleware.LoginHandler)
		router.GET("/v1/refresh_token", authMiddleware.RefreshHandler)
		router.Use(authMiddleware.MiddlewareFunc())
	}
	addRoutes(router, securedRoutes)
	return router
}

// Index is the index handler.
func Index(c *gin.Context) {
	c.String(http.StatusOK, "Hello World!")
}

type login struct {
	Username string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

// User demo
type User struct {
	UserName  string
	FirstName string
	LastName  string
}

var identityKey = "id"

func initJWT() *jwt.GinJWTMiddleware {
	// the jwt middleware
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "Evaluation",
		Key:         []byte(os.Getenv("JWT_SECRET_KEY")),
		Timeout:     time.Hour,
		MaxRefresh:  time.Hour,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*User); ok {
				return jwt.MapClaims{
					identityKey: v.UserName,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			return &User{
				UserName: claims[identityKey].(string),
			}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var loginVals login
			if err := c.ShouldBind(&loginVals); err != nil {
				return "", jwt.ErrMissingLoginValues
			}
			userID := loginVals.Username
			password := loginVals.Password
			//BUG(henrik): Replace with db lookup!
			if userID == os.Getenv("ADMIN_USER_ID") && password == os.Getenv("ADMIN_USER_PASSWORD") {
				return &User{
					UserName:  userID,
					LastName:  "Admin",
					FirstName: "John",
				}, nil
			}

			return nil, jwt.ErrFailedAuthentication
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			//BUG(henrik): Replace with db/casbin lookup!
			if v, ok := data.(*User); ok && v.UserName == os.Getenv("ADMIN_USER_ID") {
				return true
			}

			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		// TokenLookup is a string in the form of "<source>:<name>" that is used
		// to extract token from the request.
		// Optional. Default value "header:Authorization".
		// Possible values:
		// - "header:<name>"
		// - "query:<name>"
		// - "cookie:<name>"
		// - "param:<name>"
		TokenLookup: "header: Authorization, query: token, cookie: jwt",
		// TokenLookup: "query:token",
		// TokenLookup: "cookie:token",

		// TokenHeadName is a string in the header. Default value is "Bearer"
		TokenHeadName: "Bearer",

		// TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
		TimeFunc: time.Now,
	})

	if err != nil {
		log.Fatal("JWT Error:" + err.Error())
	}
	return authMiddleware
}

func addRoutes(router *gin.Engine, routes Routes) {
	for _, route := range routes {
		switch route.Method {
		case http.MethodGet:
			router.GET(route.Pattern, route.HandlerFunc)
		case http.MethodPost:
			router.POST(route.Pattern, route.HandlerFunc)
		case http.MethodPut:
			router.PUT(route.Pattern, route.HandlerFunc)
		case http.MethodPatch:
			router.PATCH(route.Pattern, route.HandlerFunc)
		case http.MethodDelete:
			router.DELETE(route.Pattern, route.HandlerFunc)
		}
	}

}
