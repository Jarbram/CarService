package controllers

import (
	"myapp/models"

	"github.com/gin-gonic/gin"
)

func GetAllCars(c *gin.Context) {
	var cars []models.Car
	if err := models.DB.Find(&cars).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": cars})
}

func GetCarByID(c *gin.Context) {
	var car []models.Car
	id := c.Param("id")

	if err := models.DB.Where("user_id = ?", id).Find(&car).Error; err != nil {
		c.JSON(404, gin.H{"error": "Car not found"})
		return
	}

	c.JSON(200, gin.H{"data": car})
}
