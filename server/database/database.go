package database

import "gorm.io/gorm"

type Database interface {
	AutoMigrate(entities ...interface{}) error
}

type GormDatabase struct {
	DB *gorm.DB
}

func NewGormDatabase(db *gorm.DB) *GormDatabase {
	return &GormDatabase{DB: db}
}

func (d *GormDatabase) AutoMigrate(entities ...interface{}) error {
	err := d.DB.AutoMigrate(entities...)
	if err != nil {
		return err
	}
	return nil
}
