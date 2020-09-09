# DefaultApi

All URIs are relative to *https://eval.mathphys.info/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**courseprofsCourseProfIdDelete**](DefaultApi.md#courseprofsCourseProfIdDelete) | **DELETE** /courseprofs/{courseProfId} | Deletes a courseProf
[**courseprofsCourseProfIdGet**](DefaultApi.md#courseprofsCourseProfIdGet) | **GET** /courseprofs/{courseProfId} | Get a courseprof by ID
[**courseprofsCourseProfIdPatch**](DefaultApi.md#courseprofsCourseProfIdPatch) | **PATCH** /courseprofs/{courseProfId} | Change a courseprof by ID
[**courseprofsCourseProfIdReportGet**](DefaultApi.md#courseprofsCourseProfIdReportGet) | **GET** /courseprofs/{courseProfId}/report | Get a courseProf report
[**courseprofsGet**](DefaultApi.md#courseprofsGet) | **GET** /courseprofs | 
[**courseprofsPost**](DefaultApi.md#courseprofsPost) | **POST** /courseprofs | 
[**coursesCourseIdDelete**](DefaultApi.md#coursesCourseIdDelete) | **DELETE** /courses/{courseId} | Deletes a module by ID
[**coursesCourseIdGet**](DefaultApi.md#coursesCourseIdGet) | **GET** /courses/{courseId} | Get a course by ID
[**coursesCourseIdInvitationsGet**](DefaultApi.md#coursesCourseIdInvitationsGet) | **GET** /courses/{courseId}/invitations | 
[**coursesCourseIdInvitationsSendPost**](DefaultApi.md#coursesCourseIdInvitationsSendPost) | **POST** /courses/{courseId}/invitations/send | 
[**coursesCourseIdPatch**](DefaultApi.md#coursesCourseIdPatch) | **PATCH** /courses/{courseId} | Change a course by ID
[**coursesCourseIdReportGet**](DefaultApi.md#coursesCourseIdReportGet) | **GET** /courses/{courseId}/report | Get a course report
[**coursesCourseIdStatsGet**](DefaultApi.md#coursesCourseIdStatsGet) | **GET** /courses/{courseId}/stats | 
[**coursesCourseIdTutorsGet**](DefaultApi.md#coursesCourseIdTutorsGet) | **GET** /courses/{courseId}/tutors | 
[**coursesCourseIdTutorsPost**](DefaultApi.md#coursesCourseIdTutorsPost) | **POST** /courses/{courseId}/tutors | 
[**coursesCourseIdTutorsTutorIdDelete**](DefaultApi.md#coursesCourseIdTutorsTutorIdDelete) | **DELETE** /courses/{courseId}/tutors/{tutorId} | Deletes a tutor by ID
[**coursesCourseIdTutorsTutorIdGet**](DefaultApi.md#coursesCourseIdTutorsTutorIdGet) | **GET** /courses/{courseId}/tutors/{tutorId} | Get a tutor by ID
[**coursesCourseIdTutorsTutorIdPatch**](DefaultApi.md#coursesCourseIdTutorsTutorIdPatch) | **PATCH** /courses/{courseId}/tutors/{tutorId} | Change a tutor by ID
[**coursesCourseIdTutorsTutorIdReportGet**](DefaultApi.md#coursesCourseIdTutorsTutorIdReportGet) | **GET** /courses/{courseId}/tutors/{tutorId}/report | Get a tutor report
[**coursesGet**](DefaultApi.md#coursesGet) | **GET** /courses | 
[**coursesPost**](DefaultApi.md#coursesPost) | **POST** /courses | 
[**facultiesFacultyIdGet**](DefaultApi.md#facultiesFacultyIdGet) | **GET** /faculties/{facultyId} | Get a faculty by ID
[**facultiesFacultyIdPatch**](DefaultApi.md#facultiesFacultyIdPatch) | **PATCH** /faculties/{facultyId} | Change a faculty by ID
[**facultiesGet**](DefaultApi.md#facultiesGet) | **GET** /faculties | 
[**facultiesPost**](DefaultApi.md#facultiesPost) | **POST** /faculties | 
[**formsFormIdGet**](DefaultApi.md#formsFormIdGet) | **GET** /forms/{formId} | Get a form by ID
[**formsFormIdPatch**](DefaultApi.md#formsFormIdPatch) | **PATCH** /forms/{formId} | Change a form by ID
[**formsGet**](DefaultApi.md#formsGet) | **GET** /forms | 
[**formsPost**](DefaultApi.md#formsPost) | **POST** /forms | 
[**modulesGet**](DefaultApi.md#modulesGet) | **GET** /modules | 
[**modulesModuleIdDelete**](DefaultApi.md#modulesModuleIdDelete) | **DELETE** /modules/{moduleId} | Deletes a module by ID
[**modulesModuleIdGet**](DefaultApi.md#modulesModuleIdGet) | **GET** /modules/{moduleId} | Get a module by ID
[**modulesModuleIdPatch**](DefaultApi.md#modulesModuleIdPatch) | **PATCH** /modules/{moduleId} | Change a module by ID
[**modulesPost**](DefaultApi.md#modulesPost) | **POST** /modules | 
[**profsGet**](DefaultApi.md#profsGet) | **GET** /profs | 
[**profsPost**](DefaultApi.md#profsPost) | **POST** /profs | 
[**profsProfIdDelete**](DefaultApi.md#profsProfIdDelete) | **DELETE** /profs/{profId} | Deletes a module by ID
[**profsProfIdGet**](DefaultApi.md#profsProfIdGet) | **GET** /profs/{profId} | Get a prof by ID
[**profsProfIdPatch**](DefaultApi.md#profsProfIdPatch) | **PATCH** /profs/{profId} | Change a prof by ID
[**questionaireInvitationIdGet**](DefaultApi.md#questionaireInvitationIdGet) | **GET** /questionaire/{invitationId} | 
[**questionaireInvitationIdPost**](DefaultApi.md#questionaireInvitationIdPost) | **POST** /questionaire/{invitationId} | 
[**statusGet**](DefaultApi.md#statusGet) | **GET** /status | 
[**termsGet**](DefaultApi.md#termsGet) | **GET** /terms | 
[**termsPost**](DefaultApi.md#termsPost) | **POST** /terms | 
[**termsTermIdGet**](DefaultApi.md#termsTermIdGet) | **GET** /terms/{termId} | Get a term by ID
[**termsTermIdPatch**](DefaultApi.md#termsTermIdPatch) | **PATCH** /terms/{termId} | Change a term by ID
[**termsTermIdReportGet**](DefaultApi.md#termsTermIdReportGet) | **GET** /terms/{termId}/report | Get a term report
[**usersGet**](DefaultApi.md#usersGet) | **GET** /users | 
[**usersPost**](DefaultApi.md#usersPost) | **POST** /users | 


<a name="courseprofsCourseProfIdDelete"></a>
# **courseprofsCourseProfIdDelete**
> courseprofsCourseProfIdDelete(courseProfId)

Deletes a courseProf

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseProfId** | **String**| ID of the courseprof to get | [default to null]

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

<a name="courseprofsCourseProfIdGet"></a>
# **courseprofsCourseProfIdGet**
> CourseProf courseprofsCourseProfIdGet(courseProfId)

Get a courseprof by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseProfId** | **String**| ID of the courseprof to get | [default to null]

### Return type

[**CourseProf**](..//Models/CourseProf.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="courseprofsCourseProfIdPatch"></a>
# **courseprofsCourseProfIdPatch**
> CourseProf courseprofsCourseProfIdPatch(courseProfId, courseProf)

Change a courseprof by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseProfId** | **String**| ID of the courseprof to get | [default to null]
 **courseProf** | [**CourseProf**](..//Models/CourseProf.md)| Changes possible to a courseprof |

### Return type

[**CourseProf**](..//Models/CourseProf.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="courseprofsCourseProfIdReportGet"></a>
# **courseprofsCourseProfIdReportGet**
> CourseProfReport courseprofsCourseProfIdReportGet(courseProfId)

Get a courseProf report

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseProfId** | **String**| ID of the courseProf to generate report | [default to null]

### Return type

[**CourseProfReport**](..//Models/CourseProfReport.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="courseprofsGet"></a>
# **courseprofsGet**
> List courseprofsGet(courseId, profId)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| Possible Id of course to filter | [optional] [default to null]
 **profId** | **String**| Possible Id of id to filter | [optional] [default to null]

### Return type

[**List**](..//Models/CourseProf.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="courseprofsPost"></a>
# **courseprofsPost**
> CourseProf courseprofsPost(courseProf)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseProf** | [**CourseProf**](..//Models/CourseProf.md)| Changes possible to a courseprof |

### Return type

[**CourseProf**](..//Models/CourseProf.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="coursesCourseIdDelete"></a>
# **coursesCourseIdDelete**
> coursesCourseIdDelete(courseId)

Deletes a module by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course to get | [default to null]

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

<a name="coursesCourseIdGet"></a>
# **coursesCourseIdGet**
> Course coursesCourseIdGet(courseId)

Get a course by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course to get | [default to null]

### Return type

[**Course**](..//Models/Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="coursesCourseIdInvitationsGet"></a>
# **coursesCourseIdInvitationsGet**
> List coursesCourseIdInvitationsGet(courseId, begin, end)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course | [default to null]
 **begin** | **Date**| The begin of the valid time of these invitations. | [default to null]
 **end** | **Date**| The begin of the valid time of these invitations. | [default to null]

### Return type

[**List**](..//Models/Invitation.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="coursesCourseIdInvitationsSendPost"></a>
# **coursesCourseIdInvitationsSendPost**
> ThirdPartySendStatus coursesCourseIdInvitationsSendPost(courseId, thirdPartySendSettings)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course | [default to null]
 **thirdPartySendSettings** | [**ThirdPartySendSettings**](..//Models/ThirdPartySendSettings.md)| Upload results into system. |

### Return type

[**ThirdPartySendStatus**](..//Models/ThirdPartySendStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="coursesCourseIdPatch"></a>
# **coursesCourseIdPatch**
> Course coursesCourseIdPatch(courseId, course)

Change a course by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course to get | [default to null]
 **course** | [**Course**](..//Models/Course.md)| Changes possible to a course |

### Return type

[**Course**](..//Models/Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="coursesCourseIdReportGet"></a>
# **coursesCourseIdReportGet**
> CourseReport coursesCourseIdReportGet(courseId)

Get a course report

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course to generate report | [default to null]

### Return type

[**CourseReport**](..//Models/CourseReport.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="coursesCourseIdStatsGet"></a>
# **coursesCourseIdStatsGet**
> CourseStats coursesCourseIdStatsGet(courseId)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course | [default to null]

### Return type

[**CourseStats**](..//Models/CourseStats.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="coursesCourseIdTutorsGet"></a>
# **coursesCourseIdTutorsGet**
> List coursesCourseIdTutorsGet(courseId)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course to get | [default to null]

### Return type

[**List**](..//Models/Tutor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="coursesCourseIdTutorsPost"></a>
# **coursesCourseIdTutorsPost**
> Tutor coursesCourseIdTutorsPost(courseId, tutor)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course to get | [default to null]
 **tutor** | [**Tutor**](..//Models/Tutor.md)| Changes possible to a tutor |

### Return type

[**Tutor**](..//Models/Tutor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="coursesCourseIdTutorsTutorIdDelete"></a>
# **coursesCourseIdTutorsTutorIdDelete**
> coursesCourseIdTutorsTutorIdDelete(courseId, tutorId)

Deletes a tutor by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course | [default to null]
 **tutorId** | **String**| ID of the tutor to get | [default to null]

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

<a name="coursesCourseIdTutorsTutorIdGet"></a>
# **coursesCourseIdTutorsTutorIdGet**
> Tutor coursesCourseIdTutorsTutorIdGet(courseId, tutorId)

Get a tutor by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course | [default to null]
 **tutorId** | **String**| ID of the tutor to get | [default to null]

### Return type

[**Tutor**](..//Models/Tutor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="coursesCourseIdTutorsTutorIdPatch"></a>
# **coursesCourseIdTutorsTutorIdPatch**
> Tutor coursesCourseIdTutorsTutorIdPatch(courseId, tutorId, tutor)

Change a tutor by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course | [default to null]
 **tutorId** | **String**| ID of the tutor to get | [default to null]
 **tutor** | [**Tutor**](..//Models/Tutor.md)| Changes possible to a tutor |

### Return type

[**Tutor**](..//Models/Tutor.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="coursesCourseIdTutorsTutorIdReportGet"></a>
# **coursesCourseIdTutorsTutorIdReportGet**
> TutorReport coursesCourseIdTutorsTutorIdReportGet(courseId, tutorId)

Get a tutor report

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **courseId** | **String**| ID of the course, in which the tutor lives to generate report | [default to null]
 **tutorId** | **String**| ID of the tutor to generate report | [default to null]

### Return type

[**TutorReport**](..//Models/TutorReport.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="coursesGet"></a>
# **coursesGet**
> List coursesGet()



### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](..//Models/Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="coursesPost"></a>
# **coursesPost**
> Course coursesPost(course)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **course** | [**Course**](..//Models/Course.md)| Changes possible to a course |

### Return type

[**Course**](..//Models/Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="facultiesFacultyIdGet"></a>
# **facultiesFacultyIdGet**
> Faculty facultiesFacultyIdGet(facultyId)

Get a faculty by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **facultyId** | **String**| ID of the faculty to get | [default to null]

### Return type

[**Faculty**](..//Models/Faculty.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="facultiesFacultyIdPatch"></a>
# **facultiesFacultyIdPatch**
> Faculty facultiesFacultyIdPatch(facultyId, faculty)

Change a faculty by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **facultyId** | **String**| ID of the faculty to get | [default to null]
 **faculty** | [**Faculty**](..//Models/Faculty.md)| Changes possible to a faculty |

### Return type

[**Faculty**](..//Models/Faculty.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="facultiesGet"></a>
# **facultiesGet**
> List facultiesGet()



### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](..//Models/Faculty.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="facultiesPost"></a>
# **facultiesPost**
> Faculty facultiesPost(faculty)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **faculty** | [**Faculty**](..//Models/Faculty.md)| Changes possible to a faculty |

### Return type

[**Faculty**](..//Models/Faculty.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="formsFormIdGet"></a>
# **formsFormIdGet**
> Form formsFormIdGet(formId)

Get a form by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **formId** | **String**| ID of the form to get | [default to null]

### Return type

[**Form**](..//Models/Form.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="formsFormIdPatch"></a>
# **formsFormIdPatch**
> Form formsFormIdPatch(formId, form)

Change a form by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **formId** | **String**| ID of the form to get | [default to null]
 **form** | [**Form**](..//Models/Form.md)| Changes possible to a form |

### Return type

[**Form**](..//Models/Form.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="formsGet"></a>
# **formsGet**
> List formsGet()



### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](..//Models/Form.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="formsPost"></a>
# **formsPost**
> Form formsPost(form)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **form** | [**Form**](..//Models/Form.md)| Changes possible to a form |

### Return type

[**Form**](..//Models/Form.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="modulesGet"></a>
# **modulesGet**
> List modulesGet()



### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](..//Models/Module.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="modulesModuleIdDelete"></a>
# **modulesModuleIdDelete**
> modulesModuleIdDelete(moduleId)

Deletes a module by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **moduleId** | **String**| ID of the module to get | [default to null]

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

<a name="modulesModuleIdGet"></a>
# **modulesModuleIdGet**
> Module modulesModuleIdGet(moduleId)

Get a module by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **moduleId** | **String**| ID of the module to get | [default to null]

### Return type

[**Module**](..//Models/Module.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="modulesModuleIdPatch"></a>
# **modulesModuleIdPatch**
> Module modulesModuleIdPatch(moduleId, module)

Change a module by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **moduleId** | **String**| ID of the module to get | [default to null]
 **module** | [**Module**](..//Models/Module.md)| Changes possible to a module |

### Return type

[**Module**](..//Models/Module.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="modulesPost"></a>
# **modulesPost**
> Module modulesPost(module)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **module** | [**Module**](..//Models/Module.md)| Changes possible to a module |

### Return type

[**Module**](..//Models/Module.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="profsGet"></a>
# **profsGet**
> List profsGet()



### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](..//Models/Prof.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="profsPost"></a>
# **profsPost**
> Prof profsPost(prof)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **prof** | [**Prof**](..//Models/Prof.md)| Changes possible to a prof |

### Return type

[**Prof**](..//Models/Prof.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="profsProfIdDelete"></a>
# **profsProfIdDelete**
> profsProfIdDelete(profId)

Deletes a module by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **profId** | **String**| ID of the prof to get | [default to null]

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

<a name="profsProfIdGet"></a>
# **profsProfIdGet**
> Prof profsProfIdGet(profId)

Get a prof by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **profId** | **String**| ID of the prof to get | [default to null]

### Return type

[**Prof**](..//Models/Prof.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="profsProfIdPatch"></a>
# **profsProfIdPatch**
> Prof profsProfIdPatch(profId, prof)

Change a prof by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **profId** | **String**| ID of the prof to get | [default to null]
 **prof** | [**Prof**](..//Models/Prof.md)| Changes possible to a prof |

### Return type

[**Prof**](..//Models/Prof.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="questionaireInvitationIdGet"></a>
# **questionaireInvitationIdGet**
> EmptyForm questionaireInvitationIdGet(invitationId)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invitationId** | **String**| ID of the invitation | [default to null]

### Return type

[**EmptyForm**](..//Models/EmptyForm.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="questionaireInvitationIdPost"></a>
# **questionaireInvitationIdPost**
> questionaireInvitationIdPost(invitationId, questionaire)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invitationId** | **String**| ID of the invitation | [default to null]
 **questionaire** | [**Questionaire**](..//Models/Questionaire.md)| Upload results into system. |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

<a name="statusGet"></a>
# **statusGet**
> Status statusGet()



### Parameters
This endpoint does not need any parameter.

### Return type

[**Status**](..//Models/Status.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="termsGet"></a>
# **termsGet**
> List termsGet()



### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](..//Models/Term.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="termsPost"></a>
# **termsPost**
> Term termsPost(term)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **term** | [**Term**](..//Models/Term.md)| Changes possible to a term |

### Return type

[**Term**](..//Models/Term.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="termsTermIdGet"></a>
# **termsTermIdGet**
> Term termsTermIdGet(termId)

Get a term by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **termId** | **String**| ID of the term to get | [default to null]

### Return type

[**Term**](..//Models/Term.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="termsTermIdPatch"></a>
# **termsTermIdPatch**
> Term termsTermIdPatch(termId, term)

Change a term by ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **termId** | **String**| ID of the term to get | [default to null]
 **term** | [**Term**](..//Models/Term.md)| Changes possible to a term |

### Return type

[**Term**](..//Models/Term.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="termsTermIdReportGet"></a>
# **termsTermIdReportGet**
> TermReport termsTermIdReportGet(termId)

Get a term report

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **termId** | **String**| ID of the term to get report from | [default to null]

### Return type

[**TermReport**](..//Models/TermReport.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="usersGet"></a>
# **usersGet**
> List usersGet()



### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](..//Models/User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="usersPost"></a>
# **usersPost**
> User usersPost(user)



### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user** | [**User**](..//Models/User.md)| Add an user to the ostseee system |

### Return type

[**User**](..//Models/User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

