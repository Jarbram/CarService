import React, { useState, useEffect } from 'react';
import './ListRequest.css';
import { Link } from 'react-router-dom';

const ListRequest = () => {
  const [requests, setRequests] = useState([]);
  const [cars, setCars] = useState([]);



  const getRequests = async () => {
    try {
      const response = await fetch('http://localhost:3000/requests');
      const data = await response.json();
      setRequests(data.requests);
  
      const carPromises = data.requests.map(async (request) => {
        const carResponse = await fetch(`http://localhost:3000/car/user/${request.user_id}`);
        const carData = await carResponse.json();
        return carData.data;
      });
  
      const carData = await Promise.all(carPromises);
      setCars(carData);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getRequests();
  }, []);


  const deleteRequest = async (requestId,index) => {
    if (cars[index].length > 0) {
      return (
        window.alert('No puede eliminar ,hay un carro en servicio')
      )
    } 
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta solicitud?');
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/requests/${requestId}`, {
          method: 'DELETE',
        });
        setRequests(requests.filter((request) => request.id !== requestId));
        console.log('Solicitud eliminada');
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!requests || requests.length === 0) {
    return <div>Waiting for clients</div>;
  }

  return (
    <div className='request_box'>
      <div className='request-container'>
        {requests.map((request,index) => (
          <div className='request-container-card' key={request.id}>
            <Link to={`/users/${request.user_id}`}>
              <div className='request-container-card-div'>
                <span className='request-container-card-span'> User: </span>
                <h3>{request.first_name}, {request.last_name}</h3>
              </div>
              <div className='request-container-card-div'>
                <span className='request-container-card-span'> Email: </span>
                <p>{request.email}</p>
              </div>
              <div className='request-container-card-div'>
                <span className='request-container-card-span'> ID: </span>
                <p>{request.user_id}</p>
              </div>
              <div className='request-container-card-div'>
    <span className='request-container-card-span'> Car in service: </span>
    <p>{cars[index] ? cars[index].length : 0}</p>
  </div>
            </Link>
            <button className='delete_button' onClick={() => deleteRequest(request.id,index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListRequest;
