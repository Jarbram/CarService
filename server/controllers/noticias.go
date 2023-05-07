package controllers

import (
	"myapp/models"

	"github.com/gin-gonic/gin"
)

func GetAllNoticias(c *gin.Context) {
	var noticias []models.Noticias
	if err := models.DB.Find(&noticias).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": noticias})
}

// Controlador para obtener una noticia por ID
func GetNoticiasByID(c *gin.Context) {
	var noticias []models.Noticias
	id := c.Param("id")

	if err := models.DB.First(&noticias, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Noticia no encontrada"})
		return
	}

	c.JSON(200, gin.H{"data": noticias})
}
