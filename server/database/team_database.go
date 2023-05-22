package database

import (
	"myapp/models"

	"gorm.io/gorm"
)

type TeamDatabase struct {
	DB *gorm.DB
}

func NewTeamDatabase(db *gorm.DB) *TeamDatabase {
	return &TeamDatabase{DB: db}
}

func (tdb *TeamDatabase) GetTeamByEmail(email string) (*models.Team, error) {
	var team models.Team
	err := tdb.DB.Where("email = ?", email).First(&team).Error
	return &team, err
}
