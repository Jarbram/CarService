package database

import (
	"myapp/models"

	"gorm.io/gorm"
)

type CarDatabase struct {
	DB *gorm.DB
}

func NewCarDatabase(db *gorm.DB) *CarDatabase {
	return &CarDatabase{DB: db}
}

func (cdb *CarDatabase) GetAllCars() ([]models.Car, error) {
	var cars []models.Car
	err := cdb.DB.Find(&cars).Error
	return cars, err
}

func (cdb *CarDatabase) GetCarsByUserID(userID uint) ([]models.Car, error) {
	var cars []models.Car
	err := cdb.DB.Where("user_id = ?", userID).Find(&cars).Error
	if err != nil {
		return nil, err
	}
	return cars, nil
}

func (cdb *CarDatabase) GetCarByID(id uint) (*models.Car, error) {
	var car models.Car
	err := cdb.DB.Where("user_id = ?", id).Find(&car).Error
	return &car, err
}

func (cdb *CarDatabase) UpdateCar(car *models.Car) error {
	return cdb.DB.Save(car).Error
}

func (cdb *CarDatabase) CreateCar(car *models.Car) error {
	return cdb.DB.Create(car).Error
}

func (cdb *CarDatabase) DeleteCar(car *models.Car) error {
	return cdb.DB.Delete(car).Error
}
