package main

import (
	"log"
	"myapp/database"
	"myapp/models"
	"myapp/routes"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {

	db, err := database.Connect()
	if err != nil {
		log.Fatal("Error connecting to database: ", err)
	}

	err = db.AutoMigrate(&models.User{}, &models.Noticias{}, &models.Car{}, &models.Team{}, &models.Request{})
	if err != nil {
		log.Fatalf("Error migrating database schema: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	router := gin.New()
	router.Use(gin.Logger())

	routes.SetupRoutes(router, db)

	router.Run(":" + port)

}
