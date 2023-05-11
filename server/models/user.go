package models

import (
	"time"
)

type User struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	Email     string `gorm:"uniqueIndex" json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
