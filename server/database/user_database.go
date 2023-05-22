package database

import (
	"myapp/models"

	"gorm.io/gorm"
)

type UserDatabase struct {
	DB *gorm.DB
}

func NewUserDatabase(db *gorm.DB) *UserDatabase {
	return &UserDatabase{DB: db}
}

func (udb *UserDatabase) CreateUser(user *models.User) error {
	return udb.DB.Create(user).Error
}

func (udb *UserDatabase) GetAllUsers() ([]models.User, error) {
	var users []models.User
	err := udb.DB.Find(&users).Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (udb *UserDatabase) GetUserByID(id uint) (*models.User, error) {
	var user models.User
	err := udb.DB.Where("id = ?", id).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (udb *UserDatabase) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := udb.DB.Where("email = ?", email).First(&user).Error
	return &user, err
}

func (udb *UserDatabase) UpdateUser(user *models.User) error {
	return udb.DB.Save(&user).Error
}

func (udb *UserDatabase) DeleteUser(id uint) error {
	user := models.User{ID: id}
	return udb.DB.Delete(&user).Error
}
