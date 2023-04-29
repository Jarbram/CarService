import React from 'react'
import './CarService.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CarService = () => {
  const [car, setCar] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Lee el id del usuario del localStorage
    if (userId) {
      axios.get(`http://localhost:3000/car/${userId}`)
        .then(response => {
          setCar(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  if (!car) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='carService' id='carService'>
      <h2 className='title-page'>My car</h2> 
      <div className='car_container'>
      {
        car.map((car) => {
          return (
            <div key={car.id} className='car_card'>
            <div className='car_details'>
              <p className='car_topic'>Brand:</p>
              <p>{car.brand}</p>
            </div>
            <div className='car_details'>
              <p className='car_topic'>Model:</p>
              <p>{car.model}</p>
            </div>
            <div className='car_details'>
              <p className='car_topic'>Year:</p>
              <p>{car.year}</p>
            </div>
            <div className='car_details'>
              <p className='car_topic'>Color:</p>
              <p>{car.color}</p>
            </div>
            <div className='car_details'>
              <p className='car_topic'>Status:</p>
              <p>{car.status}</p>
            </div>
            <div className='car_comment'>
              <p className='car_topic'>comment:</p>
              <p>{car.comment}</p>
            </div>
            </div>
            
          )
        })
      }
    </div>
    </div>
  )
}

export default CarService