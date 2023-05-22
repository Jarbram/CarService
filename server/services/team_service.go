package services

import (
	"myapp/database"
	"myapp/models"

	"golang.org/x/crypto/bcrypt"
)

type TeamService struct {
	TeamDB *database.TeamDatabase
}

func NewTeamService(teamDB *database.TeamDatabase) *TeamService {
	return &TeamService{TeamDB: teamDB}
}

func (ts *TeamService) LoginTeam(email, password string) (*models.Team, error) {
	team, err := ts.TeamDB.GetTeamByEmail(email)
	if err != nil {
		return nil, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(team.Password), []byte(password)); err != nil {
		return nil, err
	}

	return team, nil
}
