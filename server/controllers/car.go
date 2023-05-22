package controllers

import (
	"net/http"
	"strconv"

	"myapp/models"
	"myapp/services"

	"github.com/gin-gonic/gin"
)

type CarController struct {
	CarService *services.CarService
}

func NewCarController(carService *services.CarService) *CarController {
	return &CarController{CarService: carService}
}

func (cc *CarController) GetAllCars(c *gin.Context) {
	cars, err := cc.CarService.GetAllCars()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cars})
}

func (cc *CarController) GetCarByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	car, err := cc.CarService.GetCarByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Car not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": car})
}

func (cc *CarController) GetCarsByUserID(c *gin.Context) {
	userIDStr := c.Param("id")
	userID, err := strconv.ParseUint(userIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	cars, err := cc.CarService.GetCarsByUserID(uint(userID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get cars"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cars})
}

func (cc *CarController) UpdateCar(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var updates models.Car
	if err := c.BindJSON(&updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = cc.CarService.UpdateCar(uint(id), &updates)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Car not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "Car updated successfully"})
}

func (cc *CarController) CreateCar(c *gin.Context) {
	var car models.Car

	if err := c.BindJSON(&car); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := cc.CarService.CreateCar(&car)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": car})
}
