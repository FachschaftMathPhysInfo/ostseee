# Question

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | [optional] 
**Shortcode** | **string** | Unique, humanreadable label. | 
**Title** | **map[string]string** | Map of translations for a given string. A string might contain markdown code. | 
**IsMulti** | **bool** | Whether this question is a single choice or multiple choice question | [default to false]
**IsComment** | **bool** | Determines whether it is a free text form. Can not occur with isMulti and hasOtherOption. | 
**HasOtherOption** | **bool** | Some questions have an option that allows custom answers | 
**IsSlider** | **bool** | Renders this as a slider. Note: Doesnot work with hasOtherOption | [optional] 
**Regards** | **string** | Question either concerns course, lecturer or tutor. | 
**HasNotApplicableOption** | **bool** | Some questions need a not applicable option. | [optional] [default to true]
**Visualizer** | **string** | Defines how results should be displayed. | 
**Options** | [**[]Option**](Option.md) | Array of possibly labeled selection options. | 
**Position** | **int32** | Used to determine position in array | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


