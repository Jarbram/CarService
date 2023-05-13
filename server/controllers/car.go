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

func UpdateCar(c *gin.Context) {
	var car models.Car
	id := c.Param("id")

	if err := models.DB.Where("id = ?", id).First(&car).Error; err != nil {
		c.JSON(404, gin.H{"error": "Car not found"})
		return
	}

	var updates struct {
		Status  string `json:"status"`
		Comment string `json:"comment"`
	}
	if err := c.BindJSON(&updates); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if updates.Status != "" {
		car.Status = updates.Status

		if car.Status == "Entregado" {
			if err := models.DB.Delete(&car).Error; err != nil {
				c.JSON(400, gin.H{"error": "Cannot delete car"})
				return
			}
			c.JSON(200, gin.H{"message": "Car deleted successfully"})
			return
		}
	}

	if updates.Comment != "" {
		car.Comment = updates.Comment
	}

	if err := models.DB.Save(&car).Error; err != nil {
		c.JSON(400, gin.H{"error": "Cannot update car"})
		return
	}

	c.JSON(200, gin.H{"data": car})
}

func CreateCar(c *gin.Context) {
	var car models.Car

	if err := c.BindJSON(&car); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := models.DB.Create(&car).Error; err != nil {
		c.JSON(400, gin.H{"error": "Cannot create car"})
		return
	}

	c.JSON(200, gin.H{"data": car})
}
