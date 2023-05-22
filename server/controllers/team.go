package controllers

import (
	"net/http"

	"myapp/services"

	"github.com/gin-gonic/gin"
)

type TeamController struct {
	TeamService *services.TeamService
}

func NewTeamController(teamService *services.TeamService) *TeamController {
	return &TeamController{TeamService: teamService}
}

func (tc *TeamController) LoginTeam(c *gin.Context) {
	var req struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	team, err := tc.TeamService.LoginTeam(req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email or password is incorrect. Please try again."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"team": team})
}
