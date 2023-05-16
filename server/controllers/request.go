package controllers

import (
	"myapp/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateRequest(c *gin.Context) {
	var req struct {
		UserID uint `json:"userId" `
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Obtener los datos del usuario desde la tabla "users"
	var user models.User
	if err := models.DB.First(&user, req.UserID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Crear una nueva solicitud en la tabla "requests" con los datos del usuario
	request := models.Request{
		UserID:    user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Timestamp: time.Now(),
	}

	// Guardar la solicitud en la base de datos
	if err := models.DB.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"request": request})
}

func GetAllRequests(c *gin.Context) {
	var requests []models.Request
	if err := models.DB.Find(&requests).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch requests"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"requests": requests})
}

func GetRequestByID(c *gin.Context) {

}

func UpdateRequest(c *gin.Context) {

}
func DeleteRequest(c *gin.Context) {

}
