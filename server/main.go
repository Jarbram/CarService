package main

import (
	"log"
	"myapp/models"
	"myapp/routes"

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

	router := gin.Default()
	routes.SetupRoutes(router)

	err = router.Run(":8080")
	if err != nil {
		log.Fatal("Error starting server: ", err)
	}

}
