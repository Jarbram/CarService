package controllers

import (
	"fmt"
	"myapp/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// Controlador para crear un usuario
func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := models.DB.Create(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": user})
}

// Controlador para obtener todos los usuarios
func GetAllUsers(c *gin.Context) {
	var users []models.User
	if err := models.DB.Find(&users).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": users})
}

// Controlador para obtener un usuario por ID
func GetUserByID(c *gin.Context) {
	var user []models.User
	id := c.Param("id")

	if err := models.DB.First(&user, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	c.JSON(200, gin.H{"data": user})
}

// Controlador para actualizar un usuario por ID
func UpdateUser(c *gin.Context) {
	var user models.User
	id := c.Param("id")

	if err := models.DB.First(&user, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := models.DB.Save(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": user})
}

// Controlador para eliminar un usuario por ID
func DeleteUser(c *gin.Context) {
	var user models.User
	id := c.Param("id")

	if err := models.DB.First(&user, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	if err := models.DB.Delete(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "User deleted successfully"})
}

// Controlador para el registro de un nuevo usuario
func Signup(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	password_bytes := []byte(user.Password)
	hashed_password, err := bcrypt.GenerateFromPassword(password_bytes, bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	user.Password = string(hashed_password)

	// Crear nuevo usuario en la base de datos
	if err := models.DB.Create(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "User registered successfully"})
}

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
	c.SetCookie("session_token", session.Token, 3600, "/", "", false, true)
	fmt.Println(session.Token)

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

	session, err := models.CreateSessionTeam(models.DB, team)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error: Error al crear la sesion": err.Error()})
		return
	}
	c.SetCookie("session_token", session.Token, 3600, "/", "", false, true)

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

// Controlador para obtener todas las noticias
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
