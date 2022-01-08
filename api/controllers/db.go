package controllers

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"techytechster.com/rockapi/models"
)

var db *gorm.DB

func InitializeDatabase() error {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s", os.Getenv("DBHOST"), os.Getenv("DBUSER"), os.Getenv("DBPASSWORD"),
		os.Getenv("DBNAME"), os.Getenv("DBPORT"), "disable",
	)
	tmp, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	db = tmp
	autoMigrate()
	return err
}

func autoMigrate() {
	db.AutoMigrate(&models.User{})
}
