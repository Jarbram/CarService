package services

import (
	"myapp/database"
	"myapp/models"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	UserDB *database.UserDatabase
}

func NewUserService(userDB *database.UserDatabase) *UserService {
	return &UserService{UserDB: userDB}
}

func (us *UserService) CreateUser(user *models.User) error {
	return us.UserDB.CreateUser(user)
}

func (us *UserService) GetAllUsers() ([]models.User, error) {
	return us.UserDB.GetAllUsers()
}

func (us *UserService) GetUserByID(id uint) (*models.User, error) {
	return us.UserDB.GetUserByID(id)
}

func (us *UserService) Login(email, password string) (*models.User, error) {
	user, err := us.UserDB.GetUserByEmail(email)
	if err != nil {
		return nil, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, err
	}

	return user, nil
}

func (us *UserService) UpdateUser(updateUser *models.User, id uint) error {
	user, err := us.GetUserByID(id)
	if err != nil {
		return err
	}
	return us.UserDB.UpdateUser(user)
}

func (us *UserService) DeleteUser(id uint) error {
	return us.UserDB.DeleteUser(id)
}

func (us *UserService) Signup(user *models.User) error {
	passwordBytes := []byte(user.Password)
	hashedPassword, err := bcrypt.GenerateFromPassword(passwordBytes, bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	return us.UserDB.CreateUser(user)
}
