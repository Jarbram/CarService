package services

import (
	"myapp/database"
	"myapp/models"
)

type NoticiasService struct {
	NoticiasDB *database.NoticiasDatabase
}

func NewNoticiasService(noticiasDB *database.NoticiasDatabase) *NoticiasService {
	return &NoticiasService{NoticiasDB: noticiasDB}
}

func (ns *NoticiasService) GetAllNoticias() ([]models.Noticias, error) {
	return ns.NoticiasDB.GetAllNoticias()
}

func (ns *NoticiasService) GetNoticiasByID(id uint) (*models.Noticias, error) {
	return ns.NoticiasDB.GetNoticiasByID(id)
}
