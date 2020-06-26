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
	"fmt"
	"log"
	"os"
	"time"

	// WARNING!
	// Change this to a fully-qualified import path
	// once you place this file into your project.
	// For example,
	//
	//    sw "github.com/myname/myrepo/go"
	//
	sw "github.com/fachschaftmathphys/ostseee/server/go"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func initDB() *gorm.DB {
	databaseConnectionType := os.Getenv("DB_CONNECTION_TYPE")
	if databaseConnectionType == "" {
		databaseConnectionType = "sqlite3"
	}
	databaseConnectionString := os.Getenv("DB_CONNECTION_STRING")
	log.Println(databaseConnectionString)
	if databaseConnectionString == "" {
		databaseConnectionString = "test3.sqlite"
	}
	err := fmt.Errorf("initial connect failed")
	db, err := gorm.Open(databaseConnectionType, databaseConnectionString)
	for err != nil {
		db, err = gorm.Open(databaseConnectionType, databaseConnectionString)
		time.Sleep(500 * time.Millisecond)
		log.Println(err)
	}
	if migrateDB, aviable := os.LookupEnv("MIGRATE_DB"); aviable && migrateDB == "1" {
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
		db.AutoMigrate(&sw.LTIAssignment{})
	}
	if os.Getenv("DB_LOG") == "1" {
		return db.LogMode(true)
	}
	return db
}

func main() {
	log.Printf("Server started")
	db := initDB()
	defer db.Close()
	router := sw.NewRouter(db)
	log.Fatal(router.Run(":8080"))
}
