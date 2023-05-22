package services

import (
	"myapp/database"
	"myapp/models"
)

type CarService struct {
	CarDB *database.CarDatabase
}

func NewCarService(carDB *database.CarDatabase) *CarService {
	return &CarService{CarDB: carDB}
}

func (cs *CarService) GetAllCars() ([]models.Car, error) {
	return cs.CarDB.GetAllCars()
}

func (cs *CarService) GetCarByID(id uint) (*models.Car, error) {
	return cs.CarDB.GetCarByID(id)
}

func (cs *CarService) GetCarsByUserID(userID uint) ([]models.Car, error) {
	return cs.CarDB.GetCarsByUserID(userID)
}

func (cs *CarService) UpdateCar(id uint, updates *models.Car) error {
	car, err := cs.GetCarByID(id)
	if err != nil {
		return err
	}

	car.Status = updates.Status
	car.Comment = updates.Comment

	if car.Status == "Entregado" {
		return cs.CarDB.DeleteCar(car)
	}

	return cs.CarDB.UpdateCar(car)
}

func (cs *CarService) CreateCar(car *models.Car) error {
	return cs.CarDB.CreateCar(car)
}
