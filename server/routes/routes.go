package routes

import (
	"myapp/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	router.Use(cors.Default())

	router.POST("/api/signup", controllers.Signup)
	router.POST("/api/login", controllers.Login)

	router.GET("/api/users", controllers.GetAllUsers)
	router.GET("/api/users/:id", controllers.GetUserByID)
	router.POST("/api/users", controllers.CreateUser)
	router.PUT("/api/users/:id", controllers.UpdateUser)
	router.DELETE("/api/users/:id", controllers.DeleteUser)

}
