package routes

import (
	"myapp/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	// Rutas públicas
	public := router.Group("/api")
	{
		public.POST("/signup", controllers.Signup)
		public.POST("/login", controllers.Login)
	}

	// Rutas privadas
	private := router.Group("/api")
	{
		private.GET("/users", controllers.GetAllUsers)
		private.GET("/users/:id", controllers.GetUserByID)
		private.POST("/users", controllers.CreateUser)
		private.PUT("/users/:id", controllers.UpdateUser)
		private.DELETE("/users/:id", controllers.DeleteUser)
	}
}
