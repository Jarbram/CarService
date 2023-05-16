package models

import "time"

type Request struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `json:"user_id"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	Timestamp time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"timestamp"`
}
