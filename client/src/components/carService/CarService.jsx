import React, { useEffect, useState } from 'react';
import './CarService.css';
import axios from 'axios';

const CarService = () => {
  const [car, setCar] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [isCarRendered, setCarRendered] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const isRequestSent = localStorage.getItem('requestSent');

    if (userId && isRequestSent) {
      setRequestSent(true);
    }

    if (userId) {
      axios
        .get(`http://localhost:3000/car/${userId}`)
        .then(response => {
          setCar(response.data.data);
          if (response.data.data.length > 0) {
            setCarRendered(true);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (isCarRendered) {
      localStorage.removeItem('requestSent');
    }
  }, [isCarRendered]);

  const handleRequestService = () => {
    if (!requestSent) {
      setRequestSent(true);
      localStorage.setItem('requestSent', 'true');
      axios
        .post('http://localhost:3000/requests', {
          userId: parseInt(localStorage.getItem('userId'))
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  if (car.length === 0) {
    return (
      <div className='carService' id='carService'>
        <h2 className='title-page'>My car</h2>
        {requestSent ? (
          <p>Solicitud enviada</p>
        ) : (
          <button className='request-button' onClick={handleRequestService}>
            Solicitar servicio
          </button>
        )}
      </div>
    );
  }

  return (
    <div className='carService' id='carService'>
      <h2 className='title-page'>My car</h2>
      <div className='car_container'>
        {car.map(car => {
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
          );
        })}
      </div>
    </div>
  );
};

export default CarService;
