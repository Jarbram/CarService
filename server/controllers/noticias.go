package controllers

import (
	"net/http"
	"strconv"

	"myapp/services"

	"github.com/gin-gonic/gin"
)

type NoticiasController struct {
	NoticiasService *services.NoticiasService
}

func NewNoticiasController(noticiasService *services.NoticiasService) *NoticiasController {
	return &NoticiasController{NoticiasService: noticiasService}
}

func (nc *NoticiasController) GetAllNoticias(c *gin.Context) {
	noticias, err := nc.NoticiasService.GetAllNoticias()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": noticias})
}

func (nc *NoticiasController) GetNoticiasByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	noticias, err := nc.NoticiasService.GetNoticiasByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Noticia no encontrada"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": noticias})
}
