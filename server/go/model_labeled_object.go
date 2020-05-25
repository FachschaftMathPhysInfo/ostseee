package openapi

import "encoding/json"

type LabeledObject struct {
	// Map of translations for a given string. A string might contain markdown code.
	Label     map[string]string `gorm:"-" json:"label"`
	LabelJson string            `json:"-"`
}

//AfterFind is called by GORM
func (lo *LabeledObject) AfterFind() (err error) {
	return json.Unmarshal([]byte(lo.LabelJson), &lo.Label)
}

// BeforeSave is called by GORM
func (lo *LabeledObject) BeforeSave() (err error) {
	byt, err := json.Marshal(lo.Label)
	if err == nil {
		lo.LabelJson = string(byt)
	}
	return err
}

type TitledObject struct {
	// Map of translations for a given string. A string might contain markdown code.
	Title     map[string]string `gorm:"-" json:"title"`
	TitleJson string            `json:"-"`
}

//AfterFind is called by GORM
func (lo *TitledObject) AfterFind() (err error) {
	return json.Unmarshal([]byte(lo.TitleJson), &lo.Title)
}

// BeforeSave is called by GORM
func (lo *TitledObject) BeforeSave() (err error) {
	byt, err := json.Marshal(lo.Title)
	if err == nil {
		lo.TitleJson = string(byt)
	}
	return err
}
