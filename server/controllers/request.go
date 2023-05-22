package controllers

import (
	"net/http"
	"strconv"
	"time"

	"myapp/models"
	"myapp/services"

	"github.com/gin-gonic/gin"
)

type RequestsController struct {
	RequestsService *services.RequestsService
	UserService     *services.UserService
}

func NewRequestsController(rs *services.RequestsService, us *services.UserService) *RequestsController {
	return &RequestsController{RequestsService: rs, UserService: us}
}

func (rc *RequestsController) CreateRequest(c *gin.Context) {
	var req struct {
		UserID uint `json:"userId" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := rc.UserService.GetUserByID(req.UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	request := models.Request{
		UserID:    user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Timestamp: time.Now(),
	}

	if err := rc.RequestsService.CreateRequest(&request); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"request": req})
}

func (rc *RequestsController) GetAllRequests(c *gin.Context) {
	requests, err := rc.RequestsService.GetAllRequests()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch requests"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"requests": requests})
}

func (rc *RequestsController) GetRequestByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request ID"})
		return
	}

	request, err := rc.RequestsService.GetRequestByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": request})
}

func (rc *RequestsController) UpdateRequest(c *gin.Context) {
	// Implementar la lógica para actualizar una solicitud
}

func (rc *RequestsController) DeleteRequest(c *gin.Context) {
	reqId := c.Param("id")
	id, err := strconv.ParseUint(reqId, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request ID"})
		return
	}

	if err := rc.RequestsService.DeleteRequest(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Request deleted successfully"})

}
