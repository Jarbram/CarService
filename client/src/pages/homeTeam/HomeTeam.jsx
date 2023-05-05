import React from 'react'
import './HomeTeam.css'
import  Navbar  from '../../components/navbar/Navbar'
import ListUser  from '../../components/listUsers/ListUser'





const HomeTeam = () => {
  return (
    <div>
      <Navbar 
      style={{justifyContent: 'center'}}
      currentPage="team"/>
      <div className="home-team">
        <h2 className="title-page">Customers of the day</h2>
      </div>
      <ListUser />
    </div>
  )
}

export default HomeTeam