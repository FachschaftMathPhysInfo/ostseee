# \DefaultApi

All URIs are relative to *https://eval.mathphys.info/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CourseprofsCourseProfIdDelete**](DefaultApi.md#CourseprofsCourseProfIdDelete) | **Delete** /courseprofs/{courseProfId} | Deletes a courseProf
[**CourseprofsCourseProfIdGet**](DefaultApi.md#CourseprofsCourseProfIdGet) | **Get** /courseprofs/{courseProfId} | Get a courseprof by ID
[**CourseprofsCourseProfIdPatch**](DefaultApi.md#CourseprofsCourseProfIdPatch) | **Patch** /courseprofs/{courseProfId} | Change a courseprof by ID
[**CourseprofsCourseProfIdReportGet**](DefaultApi.md#CourseprofsCourseProfIdReportGet) | **Get** /courseprofs/{courseProfId}/report | Get a courseProf report
[**CourseprofsGet**](DefaultApi.md#CourseprofsGet) | **Get** /courseprofs | 
[**CourseprofsPost**](DefaultApi.md#CourseprofsPost) | **Post** /courseprofs | 
[**CoursesCourseIdDelete**](DefaultApi.md#CoursesCourseIdDelete) | **Delete** /courses/{courseId} | Deletes a module by ID
[**CoursesCourseIdGet**](DefaultApi.md#CoursesCourseIdGet) | **Get** /courses/{courseId} | Get a course by ID
[**CoursesCourseIdInvitationsGet**](DefaultApi.md#CoursesCourseIdInvitationsGet) | **Get** /courses/{courseId}/invitations | 
[**CoursesCourseIdInvitationsSendPost**](DefaultApi.md#CoursesCourseIdInvitationsSendPost) | **Post** /courses/{courseId}/invitations/send | 
[**CoursesCourseIdPatch**](DefaultApi.md#CoursesCourseIdPatch) | **Patch** /courses/{courseId} | Change a course by ID
[**CoursesCourseIdReportGet**](DefaultApi.md#CoursesCourseIdReportGet) | **Get** /courses/{courseId}/report | Get a course report
[**CoursesCourseIdTutorsGet**](DefaultApi.md#CoursesCourseIdTutorsGet) | **Get** /courses/{courseId}/tutors | 
[**CoursesCourseIdTutorsPost**](DefaultApi.md#CoursesCourseIdTutorsPost) | **Post** /courses/{courseId}/tutors | 
[**CoursesCourseIdTutorsTutorIdDelete**](DefaultApi.md#CoursesCourseIdTutorsTutorIdDelete) | **Delete** /courses/{courseId}/tutors/{tutorId} | Deletes a tutor by ID
[**CoursesCourseIdTutorsTutorIdGet**](DefaultApi.md#CoursesCourseIdTutorsTutorIdGet) | **Get** /courses/{courseId}/tutors/{tutorId} | Get a tutor by ID
[**CoursesCourseIdTutorsTutorIdPatch**](DefaultApi.md#CoursesCourseIdTutorsTutorIdPatch) | **Patch** /courses/{courseId}/tutors/{tutorId} | Change a tutor by ID
[**CoursesCourseIdTutorsTutorIdReportGet**](DefaultApi.md#CoursesCourseIdTutorsTutorIdReportGet) | **Get** /courses/{courseId}/tutors/{tutorId}/report | Get a tutor report
[**CoursesGet**](DefaultApi.md#CoursesGet) | **Get** /courses | 
[**CoursesPost**](DefaultApi.md#CoursesPost) | **Post** /courses | 
[**FacultiesFacultyIdGet**](DefaultApi.md#FacultiesFacultyIdGet) | **Get** /faculties/{facultyId} | Get a faculty by ID
[**FacultiesFacultyIdPatch**](DefaultApi.md#FacultiesFacultyIdPatch) | **Patch** /faculties/{facultyId} | Change a faculty by ID
[**FacultiesGet**](DefaultApi.md#FacultiesGet) | **Get** /faculties | 
[**FacultiesPost**](DefaultApi.md#FacultiesPost) | **Post** /faculties | 
[**FormsFormIdGet**](DefaultApi.md#FormsFormIdGet) | **Get** /forms/{formId} | Get a form by ID
[**FormsFormIdPatch**](DefaultApi.md#FormsFormIdPatch) | **Patch** /forms/{formId} | Change a form by ID
[**FormsGet**](DefaultApi.md#FormsGet) | **Get** /forms | 
[**FormsPost**](DefaultApi.md#FormsPost) | **Post** /forms | 
[**ModulesGet**](DefaultApi.md#ModulesGet) | **Get** /modules | 
[**ModulesModuleIdDelete**](DefaultApi.md#ModulesModuleIdDelete) | **Delete** /modules/{moduleId} | Deletes a module by ID
[**ModulesModuleIdGet**](DefaultApi.md#ModulesModuleIdGet) | **Get** /modules/{moduleId} | Get a module by ID
[**ModulesModuleIdPatch**](DefaultApi.md#ModulesModuleIdPatch) | **Patch** /modules/{moduleId} | Change a module by ID
[**ModulesPost**](DefaultApi.md#ModulesPost) | **Post** /modules | 
[**ProfsGet**](DefaultApi.md#ProfsGet) | **Get** /profs | 
[**ProfsPost**](DefaultApi.md#ProfsPost) | **Post** /profs | 
[**ProfsProfIdDelete**](DefaultApi.md#ProfsProfIdDelete) | **Delete** /profs/{profId} | Deletes a module by ID
[**ProfsProfIdGet**](DefaultApi.md#ProfsProfIdGet) | **Get** /profs/{profId} | Get a prof by ID
[**ProfsProfIdPatch**](DefaultApi.md#ProfsProfIdPatch) | **Patch** /profs/{profId} | Change a prof by ID
[**QuestionaireInvitationIdGet**](DefaultApi.md#QuestionaireInvitationIdGet) | **Get** /questionaire/{invitationId} | 
[**QuestionaireInvitationIdPost**](DefaultApi.md#QuestionaireInvitationIdPost) | **Post** /questionaire/{invitationId} | 
[**StatusGet**](DefaultApi.md#StatusGet) | **Get** /status | 
[**TermsGet**](DefaultApi.md#TermsGet) | **Get** /terms | 
[**TermsPost**](DefaultApi.md#TermsPost) | **Post** /terms | 
[**TermsTermIdGet**](DefaultApi.md#TermsTermIdGet) | **Get** /terms/{termId} | Get a term by ID
[**TermsTermIdPatch**](DefaultApi.md#TermsTermIdPatch) | **Patch** /terms/{termId} | Change a term by ID
[**TermsTermIdReportGet**](DefaultApi.md#TermsTermIdReportGet) | **Get** /terms/{termId}/report | Get a term report



## CourseprofsCourseProfIdDelete

> CourseprofsCourseProfIdDelete(ctx, courseProfId)

Deletes a courseProf

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseProfId** | **string**| ID of the courseprof to get | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CourseprofsCourseProfIdGet

> CourseProf CourseprofsCourseProfIdGet(ctx, courseProfId)

Get a courseprof by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseProfId** | **string**| ID of the courseprof to get | 

### Return type

[**CourseProf**](CourseProf.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CourseprofsCourseProfIdPatch

> CourseProf CourseprofsCourseProfIdPatch(ctx, courseProfId, courseProf)

Change a courseprof by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseProfId** | **string**| ID of the courseprof to get | 
**courseProf** | [**CourseProf**](CourseProf.md)| Changes possible to a courseprof | 

### Return type

[**CourseProf**](CourseProf.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CourseprofsCourseProfIdReportGet

> CourseProfReport CourseprofsCourseProfIdReportGet(ctx, courseProfId)

Get a courseProf report

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseProfId** | **string**| ID of the courseProf to generate report | 

### Return type

[**CourseProfReport**](CourseProfReport.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CourseprofsGet

> []CourseProf CourseprofsGet(ctx, optional)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
 **optional** | ***CourseprofsGetOpts** | optional parameters | nil if no parameters

### Optional Parameters

Optional parameters are passed through a pointer to a CourseprofsGetOpts struct


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **optional.String**| Possible Id of course to filter | 
 **profId** | **optional.String**| Possible Id of id to filter | 

### Return type

[**[]CourseProf**](CourseProf.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CourseprofsPost

> CourseProf CourseprofsPost(ctx, courseProf)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseProf** | [**CourseProf**](CourseProf.md)| Changes possible to a courseprof | 

### Return type

[**CourseProf**](CourseProf.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdDelete

> CoursesCourseIdDelete(ctx, courseId)

Deletes a module by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course to get | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdGet

> Course CoursesCourseIdGet(ctx, courseId)

Get a course by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course to get | 

### Return type

[**Course**](Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdInvitationsGet

> []Invitation CoursesCourseIdInvitationsGet(ctx, courseId, begin, end)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course | 
**begin** | **time.Time**| The begin of the valid time of these invitations. | 
**end** | **time.Time**| The begin of the valid time of these invitations. | 

### Return type

[**[]Invitation**](Invitation.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdInvitationsSendPost

> ThirdPartySendStatus CoursesCourseIdInvitationsSendPost(ctx, courseId, thirdPartySendSettings)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course | 
**thirdPartySendSettings** | [**ThirdPartySendSettings**](ThirdPartySendSettings.md)| Upload results into system. | 

### Return type

[**ThirdPartySendStatus**](ThirdPartySendStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdPatch

> Course CoursesCourseIdPatch(ctx, courseId, course)

Change a course by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course to get | 
**course** | [**Course**](Course.md)| Changes possible to a course | 

### Return type

[**Course**](Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdReportGet

> CourseReport CoursesCourseIdReportGet(ctx, courseId)

Get a course report

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course to generate report | 

### Return type

[**CourseReport**](CourseReport.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdTutorsGet

> []Tutor CoursesCourseIdTutorsGet(ctx, courseId)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course to get | 

### Return type

[**[]Tutor**](Tutor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdTutorsPost

> Tutor CoursesCourseIdTutorsPost(ctx, courseId, tutor)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course to get | 
**tutor** | [**Tutor**](Tutor.md)| Changes possible to a tutor | 

### Return type

[**Tutor**](Tutor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdTutorsTutorIdDelete

> CoursesCourseIdTutorsTutorIdDelete(ctx, courseId, tutorId)

Deletes a tutor by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course | 
**tutorId** | **string**| ID of the tutor to get | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdTutorsTutorIdGet

> Tutor CoursesCourseIdTutorsTutorIdGet(ctx, courseId, tutorId)

Get a tutor by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course | 
**tutorId** | **string**| ID of the tutor to get | 

### Return type

[**Tutor**](Tutor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdTutorsTutorIdPatch

> Tutor CoursesCourseIdTutorsTutorIdPatch(ctx, courseId, tutorId, tutor)

Change a tutor by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course | 
**tutorId** | **string**| ID of the tutor to get | 
**tutor** | [**Tutor**](Tutor.md)| Changes possible to a tutor | 

### Return type

[**Tutor**](Tutor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesCourseIdTutorsTutorIdReportGet

> TutorReport CoursesCourseIdTutorsTutorIdReportGet(ctx, courseId, tutorId)

Get a tutor report

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **string**| ID of the course, in which the tutor lives to generate report | 
**tutorId** | **string**| ID of the tutor to generate report | 

### Return type

[**TutorReport**](TutorReport.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesGet

> []Course CoursesGet(ctx, )



### Required Parameters

This endpoint does not need any parameter.

### Return type

[**[]Course**](Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CoursesPost

> Course CoursesPost(ctx, course)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**course** | [**Course**](Course.md)| Changes possible to a course | 

### Return type

[**Course**](Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## FacultiesFacultyIdGet

> Faculty FacultiesFacultyIdGet(ctx, facultyId)

Get a faculty by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**facultyId** | **string**| ID of the faculty to get | 

### Return type

[**Faculty**](Faculty.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## FacultiesFacultyIdPatch

> Faculty FacultiesFacultyIdPatch(ctx, facultyId, faculty)

Change a faculty by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**facultyId** | **string**| ID of the faculty to get | 
**faculty** | [**Faculty**](Faculty.md)| Changes possible to a faculty | 

### Return type

[**Faculty**](Faculty.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## FacultiesGet

> []Faculty FacultiesGet(ctx, )



### Required Parameters

This endpoint does not need any parameter.

### Return type

[**[]Faculty**](Faculty.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## FacultiesPost

> Faculty FacultiesPost(ctx, faculty)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**faculty** | [**Faculty**](Faculty.md)| Changes possible to a faculty | 

### Return type

[**Faculty**](Faculty.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## FormsFormIdGet

> Form FormsFormIdGet(ctx, formId)

Get a form by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**formId** | **string**| ID of the form to get | 

### Return type

[**Form**](Form.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## FormsFormIdPatch

> Form FormsFormIdPatch(ctx, formId, form)

Change a form by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**formId** | **string**| ID of the form to get | 
**form** | [**Form**](Form.md)| Changes possible to a form | 

### Return type

[**Form**](Form.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## FormsGet

> []Form FormsGet(ctx, )



### Required Parameters

This endpoint does not need any parameter.

### Return type

[**[]Form**](Form.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## FormsPost

> Form FormsPost(ctx, form)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**form** | [**Form**](Form.md)| Changes possible to a form | 

### Return type

[**Form**](Form.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ModulesGet

> []Module ModulesGet(ctx, )



### Required Parameters

This endpoint does not need any parameter.

### Return type

[**[]Module**](Module.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ModulesModuleIdDelete

> ModulesModuleIdDelete(ctx, moduleId)

Deletes a module by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**moduleId** | **string**| ID of the module to get | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ModulesModuleIdGet

> Module ModulesModuleIdGet(ctx, moduleId)

Get a module by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**moduleId** | **string**| ID of the module to get | 

### Return type

[**Module**](Module.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ModulesModuleIdPatch

> Module ModulesModuleIdPatch(ctx, moduleId, module)

Change a module by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**moduleId** | **string**| ID of the module to get | 
**module** | [**Module**](Module.md)| Changes possible to a module | 

### Return type

[**Module**](Module.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ModulesPost

> Module ModulesPost(ctx, module)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**module** | [**Module**](Module.md)| Changes possible to a module | 

### Return type

[**Module**](Module.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ProfsGet

> []Prof ProfsGet(ctx, )



### Required Parameters

This endpoint does not need any parameter.

### Return type

[**[]Prof**](Prof.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ProfsPost

> Prof ProfsPost(ctx, prof)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**prof** | [**Prof**](Prof.md)| Changes possible to a prof | 

### Return type

[**Prof**](Prof.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ProfsProfIdDelete

> ProfsProfIdDelete(ctx, profId)

Deletes a module by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**profId** | **string**| ID of the prof to get | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ProfsProfIdGet

> Prof ProfsProfIdGet(ctx, profId)

Get a prof by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**profId** | **string**| ID of the prof to get | 

### Return type

[**Prof**](Prof.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ProfsProfIdPatch

> Prof ProfsProfIdPatch(ctx, profId, prof)

Change a prof by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**profId** | **string**| ID of the prof to get | 
**prof** | [**Prof**](Prof.md)| Changes possible to a prof | 

### Return type

[**Prof**](Prof.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## QuestionaireInvitationIdGet

> EmptyForm QuestionaireInvitationIdGet(ctx, invitationId)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**invitationId** | **string**| ID of the invitation | 

### Return type

[**EmptyForm**](EmptyForm.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## QuestionaireInvitationIdPost

> QuestionaireInvitationIdPost(ctx, invitationId, questionaire)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**invitationId** | **string**| ID of the invitation | 
**questionaire** | [**Questionaire**](Questionaire.md)| Upload results into system. | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## StatusGet

> Status StatusGet(ctx, )



### Required Parameters

This endpoint does not need any parameter.

### Return type

[**Status**](Status.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## TermsGet

> []Term TermsGet(ctx, )



### Required Parameters

This endpoint does not need any parameter.

### Return type

[**[]Term**](Term.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## TermsPost

> Term TermsPost(ctx, term)



### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**term** | [**Term**](Term.md)| Changes possible to a term | 

### Return type

[**Term**](Term.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## TermsTermIdGet

> Term TermsTermIdGet(ctx, termId)

Get a term by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**termId** | **string**| ID of the term to get | 

### Return type

[**Term**](Term.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## TermsTermIdPatch

> Term TermsTermIdPatch(ctx, termId, term)

Change a term by ID

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**termId** | **string**| ID of the term to get | 
**term** | [**Term**](Term.md)| Changes possible to a term | 

### Return type

[**Term**](Term.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## TermsTermIdReportGet

> TermReport TermsTermIdReportGet(ctx, termId)

Get a term report

### Required Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**termId** | **string**| ID of the term to get report from | 

### Return type

[**TermReport**](TermReport.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

