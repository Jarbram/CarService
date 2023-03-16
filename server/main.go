package main

import (
	"log"
	"myapp/models"
	"myapp/routes"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {

	err := models.NewDatabase()
	if err != nil {
		log.Fatal("Error connecting to database: ", err)
	}

	err = models.Migrate()
	if err != nil {
		log.Fatal(err)
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router := gin.New()
	router.Use(gin.Logger())

	routes.SetupRoutes(router)

	router.Run(":" + port)

}
