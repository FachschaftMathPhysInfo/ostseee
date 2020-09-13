# Result

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | [optional] 
**Label** | **map[string]string** | Map of translations for a given string. A string might contain markdown code. | [optional] 
**Visualizer** | **string** | indicate, how result is displayed. | [optional] 
**Avg** | **float32** | If applicable return the average of this field | [optional] 
**Stddev** | **float32** | If applicable return the standard deviation of this answer | [optional] 
**AvgQuestion** | **float32** | If applicable return the average of this question globally. | [optional] 
**StddevQuestion** | **float32** | If applicable return the standard deviation  of this question globally. | [optional] 
**NotApplicableCount** | **float32** | gives the number of not applicable. | [optional] 
**Shortcode** | **string** | Shortcode of the question | [optional] 
**Values** | [**[]ResultPair**](ResultPair.md) |  | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


