import React, { useState, useEffect } from 'react';
import './ListRequest.css';
import { Link } from 'react-router-dom';

const ListRequest = () => {
  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    try {
      const response = await fetch('http://localhost:3000/requests');
      const data = await response.json();
      setRequests(data.requests);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <div>En espera de clientes</div>;
  }

  return (
    <div className='request_box'>
      <div className='request-container'>
        {requests.map((request) => (
          <Link to={`/users/${request.user_id}`} className='request-container-card' key={request.id}>
            <article>
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
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ListRequest;
