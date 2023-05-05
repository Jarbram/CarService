package models

import (
	"myapp/utils"
	"time"

	"gorm.io/gorm"
)

type Session struct {
	ID      uint   `gorm:"primaryKey"`
	UserID  uint   `gorm:"not null"`
	Token   string `gorm:"not null"`
	Expires time.Time
	User    User `gorm:"foreignKey:UserID"`
}

func CreateSession(db *gorm.DB, user User) (*Session, error) {
	token, err := utils.GenerateSessionToken()
	if err != nil {
		return nil, err
	}
	expires := time.Now().Add(24 * time.Hour)
	session := &Session{
		UserID:  user.ID,
		Token:   token,
		Expires: expires,
	}
	if err := db.Create(session).Error; err != nil {
		return nil, err
	}
	return session, nil
}

func CreateSessionTeam(db *gorm.DB, team Team) (*Session, error) {
	token, err := utils.GenerateSessionToken()
	if err != nil {
		return nil, err
	}
	expires := time.Now().Add(24 * time.Hour)
	session := &Session{
		UserID:  team.ID,
		Token:   token,
		Expires: expires,
	}
	if err := db.Create(session).Error; err != nil {
		return nil, err
	}
	return session, nil
}

func GetSession(db *gorm.DB, token string) (*Session, error) {
	session := &Session{}
	if err := db.Where("token = ?", token).Preload("User").First(session).Error; err != nil {
		return nil, err
	}
	return session, nil
}
