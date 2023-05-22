package database

import (
	"myapp/models"

	"gorm.io/gorm"
)

type RequestsDatabase struct {
	DB *gorm.DB
}

func NewRequestsDatabase(db *gorm.DB) *RequestsDatabase {
	return &RequestsDatabase{DB: db}
}

func (rdb *RequestsDatabase) CreateRequest(request *models.Request) error {
	return rdb.DB.Create(request).Error
}

func (rdb *RequestsDatabase) GetAllRequests() ([]models.Request, error) {
	var requests []models.Request
	err := rdb.DB.Find(&requests).Error
	return requests, err
}

func (rdb *RequestsDatabase) GetRequestByID(id uint) (*models.Request, error) {
	var request models.Request
	err := rdb.DB.First(&request, id).Error
	return &request, err
}

func (rdb *RequestsDatabase) UpdateRequest(request *models.Request) error {
	return rdb.DB.Save(request).Error
}

func (rdb *RequestsDatabase) DeleteRequest(id uint) error {
	var request models.Request
	return rdb.DB.Delete(request, id).Error
}
