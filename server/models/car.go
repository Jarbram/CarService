package models

import (
	"time"
)

type Car struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	Brand     string `json:"brand"`
	Model     string `json:"model"`
	Year      string `json:"year"`
	Color     string `json:"color"`
	Status    string `json:"status"`
	Comment   string `json:"comment"`
	UserID    uint   `json:"user_id"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
