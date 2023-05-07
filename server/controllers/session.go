package controllers

import (
	"fmt"
	"myapp/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// Controlador para el inicio de sesión de un usuario existente
func Login(c *gin.Context) {
	var req struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := models.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email o contraseña incorrectos. Por favor, inténtelo de nuevo."})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email o contraseña incorrectos. Por favor, inténtelo de nuevo."})
		return
	}

	session, err := models.CreateSession(models.DB, user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error: Error al crear la sesion": err.Error()})
		return
	}

	cookie := &http.Cookie{
		Name:     "session_token",
		Value:    session.Token,
		Expires:  time.Now().Add(3600 * time.Second),
		Path:     "/",
		Domain:   "localhost",
		SameSite: http.SameSiteNoneMode,
		Secure:   false,
		HttpOnly: false,
	}
	http.SetCookie(c.Writer, cookie)
	fmt.Println("Cookie de sesión establecida:", session.Token)

	c.JSON(http.StatusOK, gin.H{"user": user, "session": session})
}

// Controlador para inicio de sesión de colaboradores
func LoginTeam(c *gin.Context) {
	var req struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var team models.Team
	if err := models.DB.Where("email = ?", req.Email).First(&team).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email o contraseña incorrectos. Por favor, inténtelo de nuevo."})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(team.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email o contraseña incorrectos. Por favor, inténtelo de nuevo."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"team": team})
}

func Logout(c *gin.Context) {
	// Obtener el token de sesión del cookie
	sessionToken, err := c.Cookie("session_token")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No se encontró el token de sesión"})
		return
	}

	// Buscar la sesión correspondiente al token en la base de datos
	session, err := models.GetSession(models.DB, sessionToken)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No se encontró la sesión"})
		return
	}

	// Eliminar la sesión de la base de datos
	if err := models.DB.Delete(session).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al eliminar la sesión"})
		return
	}

	// Eliminar el cookie de sesión del navegador
	c.SetCookie("session_token", "", -1, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{"message": "Sesión cerrada exitosamente"})
}
