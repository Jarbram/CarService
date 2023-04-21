package models

import "time"

type Noticias struct {
	ID               uint      `gorm:"primary_key" json:"id"`
	Titulo           string    `gorm:"not null" json:"titulo"`
	FechaPublicacion time.Time `gorm:"not null" json:"fecha_publicacion"`
	Autor            string    `gorm:"not null" json:"autor"`
	Contenido        string    `gorm:"not null" json:"contenido"`
	Imagen           string    `gorm:"not null" json:"imagen"`
}
