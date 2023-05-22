package routes

import (
	"myapp/controllers"
	"myapp/database"
	"myapp/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(router *gin.Engine, db *gorm.DB) {

	router.Use(cors.Default())

	userDB := database.NewUserDatabase(db)
	carDB := database.NewCarDatabase(db)
	noticiasDB := database.NewNoticiasDatabase(db)
	teamDB := database.NewTeamDatabase(db)
	requestDB := database.NewRequestsDatabase(db)

	carService := services.NewCarService(carDB)
	userService := services.NewUserService(userDB)
	noticiasService := services.NewNoticiasService(noticiasDB)
	teamService := services.NewTeamService(teamDB)
	requestService := services.NewRequestsService(requestDB)

	usersController := controllers.NewUserController(userService)
	carsController := controllers.NewCarController(carService)
	noticiasController := controllers.NewNoticiasController(noticiasService)
	teamController := controllers.NewTeamController(teamService)
	requestController := controllers.NewRequestsController(requestService, userService)

	router.POST("/signup", usersController.Signup)
	router.POST("/login", usersController.Login)
	router.POST("/loginTeam", teamController.LoginTeam)

	router.GET("/noticias", noticiasController.GetAllNoticias)
	router.GET("/noticias/:id", noticiasController.GetNoticiasByID)

	router.GET("/cars", carsController.GetAllCars)
	router.GET("/car/:id", carsController.GetCarByID)
	router.GET("/car/user/:id", carsController.GetCarsByUserID)
	router.POST("/car", carsController.CreateCar)
	router.PUT("/car/:id", carsController.UpdateCar)

	router.GET("/users", usersController.GetAllUsers)
	router.GET("/users/:id", usersController.GetUserByID)
	router.POST("/users", usersController.CreateUser)
	router.PUT("/users/:id", usersController.UpdateUser)
	router.DELETE("/users/:id", usersController.DeleteUser)

	router.POST("/requests", requestController.CreateRequest)
	router.GET("/requests", requestController.GetAllRequests)
	router.GET("/requests/:id", requestController.GetRequestByID)
	router.PUT("/requests/:id", requestController.UpdateRequest)
	router.DELETE("/requests/:id", requestController.DeleteRequest)
}
