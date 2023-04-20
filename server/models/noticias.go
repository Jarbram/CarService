package models

import "time"

type Noticia struct {
	ID               int
	Titulo           string
	FechaPublicacion time.Time
	Autor            string
	Contenido        string
	Imagen           string
}
