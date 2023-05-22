package services

import (
	"myapp/database"
	"myapp/models"
)

type RequestsService struct {
	RequestsDB *database.RequestsDatabase
}

func NewRequestsService(requestsDB *database.RequestsDatabase) *RequestsService {
	return &RequestsService{RequestsDB: requestsDB}
}

func (rs *RequestsService) CreateRequest(request *models.Request) error {
	return rs.RequestsDB.CreateRequest(request)
}

func (rs *RequestsService) GetAllRequests() ([]models.Request, error) {
	return rs.RequestsDB.GetAllRequests()
}

func (rs *RequestsService) GetRequestByID(id uint) (*models.Request, error) {
	return rs.RequestsDB.GetRequestByID(id)
}

func (rs *RequestsService) UpdateRequest(request *models.Request) error {
	return rs.RequestsDB.UpdateRequest(request)
}

func (rs *RequestsService) DeleteRequest(id uint) error {
	return rs.RequestsDB.DeleteRequest(id)
}
