package database

import (
	"myapp/models"

	"gorm.io/gorm"
)

type NoticiasDatabase struct {
	DB *gorm.DB
}

func NewNoticiasDatabase(db *gorm.DB) *NoticiasDatabase {
	return &NoticiasDatabase{DB: db}
}

func (ndb *NoticiasDatabase) GetAllNoticias() ([]models.Noticias, error) {
	var noticias []models.Noticias
	err := ndb.DB.Find(&noticias).Error
	return noticias, err
}

func (ndb *NoticiasDatabase) GetNoticiasByID(id uint) (*models.Noticias, error) {
	var noticias models.Noticias
	err := ndb.DB.First(&noticias, id).Error
	return &noticias, err
}
