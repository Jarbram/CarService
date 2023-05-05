package routes

import (
	"myapp/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	router.Use(cors.Default())

	router.POST("/signup", controllers.Signup)
	router.POST("/login", controllers.Login)
	router.POST("/loginTeam", controllers.LoginTeam)
	router.POST("/logout", controllers.Logout)

	router.GET("/noticias", controllers.GetAllNoticias)
	router.GET("/noticias/:id", controllers.GetNoticiasByID)

	router.GET("/cars", controllers.GetAllCars)
	router.GET("/car/:id", controllers.GetCarByID)

	router.GET("/users", controllers.GetAllUsers)
	router.GET("/users/:id", controllers.GetUserByID)
	router.POST("/users", controllers.CreateUser)
	router.PUT("/users/:id", controllers.UpdateUser)
	router.DELETE("/users/:id", controllers.DeleteUser)

}
