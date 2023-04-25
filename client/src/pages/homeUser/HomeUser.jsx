import React from 'react'
import './homeuser.css'
import Navbar from '../../components/navbar/Navbar'
import ListPost from '../../components/listPost/ListPost'
import CarService from '../../components/carService/CarService'

const HomeUser = () => {
  return (
    <div>
      <Navbar isHamburgerVisible ={true} currentPage="home"/>
      <div className="home-user">
        <h2 className='title-page'>Learn how to care you car ..</h2>
      </div>
      <ListPost />
      <CarService />
    </div>
  ) 
}

export default HomeUser