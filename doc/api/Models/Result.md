# Result
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | [**String**](string.md) |  | [optional] [default to null]
**label** | [**Map**](string.md) | Map of translations for a given string. A string might contain markdown code. | [optional] [default to null]
**visualizer** | [**String**](string.md) | indicate, how result is displayed. | [optional] [default to null]
**avg** | [**BigDecimal**](number.md) | If applicable return the average of this field | [optional] [default to null]
**stddev** | [**BigDecimal**](number.md) | If applicable return the standard deviation of this answer | [optional] [default to null]
**avgQuestion** | [**BigDecimal**](number.md) | If applicable return the average of this question globally. | [optional] [default to null]
**stddevQuestion** | [**BigDecimal**](number.md) | If applicable return the standard deviation  of this question globally. | [optional] [default to null]
**notApplicableCount** | [**BigDecimal**](number.md) | gives the number of not applicable. | [optional] [default to null]
**values** | [**List**](ResultPair.md) |  | [optional] [default to null]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

