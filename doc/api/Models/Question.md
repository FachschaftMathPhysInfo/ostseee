# Question
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | [**String**](string.md) |  | [optional] [default to null]
**shortcode** | [**String**](string.md) | Unique, humanreadable label. | [default to null]
**title** | [**Map**](string.md) | Map of translations for a given string. A string might contain markdown code. | [default to null]
**isMulti** | [**Boolean**](boolean.md) | Whether this question is a single choice or multiple choice question | [default to false]
**isComment** | [**Boolean**](boolean.md) | Determines whether it is a free text form. Can not occur with isMulti and hasOtherOption. | [default to null]
**hasOtherOption** | [**Boolean**](boolean.md) | Some questions have an option that allows custom answers | [default to null]
**isSlider** | [**Boolean**](boolean.md) | Renders this as a slider. Note: Doesnot work with hasOtherOption | [optional] [default to null]
**regards** | [**String**](string.md) | Question either concerns course, lecturer or tutor. | [default to null]
**hasNotApplicableOption** | [**Boolean**](boolean.md) | Some questions need a not applicable option. | [optional] [default to true]
**visualizer** | [**String**](string.md) | Defines how results should be displayed. | [default to null]
**options** | [**List**](Option.md) | Array of possibly labeled selection options. | [default to null]
**position** | [**Integer**](integer.md) | Used to determine position in array | [optional] [default to null]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

