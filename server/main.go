/*
 * Evaluation
 *
 * This API descripes the online evaluation service, as accessed by the user and organizers.
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package main

import (
	"log"

	// WARNING!
	// Change this to a fully-qualified import path
	// once you place this file into your project.
	// For example,
	//
	//    sw "github.com/myname/myrepo/go"
	//
	sw "github.com/fachschaftmathphys/ostseee/server/go"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func initDB() *gorm.DB {
	db, err := gorm.Open("sqlite3", "test3.sqlite")
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&sw.Faculty{})
	db.AutoMigrate(&sw.Form{})
	db.AutoMigrate(&sw.AbstractForm{})
	db.AutoMigrate(&sw.Page{})
	db.AutoMigrate(&sw.Section{})
	db.AutoMigrate(&sw.Question{})
	db.AutoMigrate(&sw.Option{})
	db.AutoMigrate(&sw.Term{})
	db.AutoMigrate(&sw.Module{})
	db.AutoMigrate(&sw.Prof{})
	db.AutoMigrate(&sw.Course{})
	db.AutoMigrate(&sw.CourseProf{})
	db.AutoMigrate(&sw.CourseProfReport{})
	db.AutoMigrate(&sw.CourseReport{})
	db.AutoMigrate(&sw.Tutor{})
	db.AutoMigrate(&sw.TutorReport{})
	db.AutoMigrate(&sw.Invitation{})
	db.AutoMigrate(&sw.Questionaire{})
	db.AutoMigrate(&sw.SingleAnswer{})

	return db
}

func main() {
	log.Printf("Server started")
	db := initDB()
	defer db.Close()
	router := sw.NewRouter(db)

	log.Fatal(router.Run(":8080"))
}
