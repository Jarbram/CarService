import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios';



import './PostUser.css'

const PostUser = () => {
    const [user, setUser] = useState([]);
    const [car, setCar] = useState([]);
    const {id} = useParams();

    const handleEdit = (carId) => {
        // Lógica para mostrar el formulario modal de edición
        const newStatus = prompt('Nuevo estado:');
        const newComment = prompt('Nuevo comentario:');
        if (newStatus || newComment) {
          axios.put(`http://localhost:3000/car/${carId}`, {
            status: newStatus,
            comment: newComment
          }).then(response => {
            // Actualiza los detalles del automóvil en el estado
            setCar(prevCar => prevCar.map(car => {
              if (car.id === carId) {
                return {
                  ...car,
                  status: newStatus || car.status,
                  comment: newComment || car.comment
                };
              } else {
                return car;
              }
            }));
          }).catch(error => {
            console.log(error);
          });
        }
      }

    const getUser = async () => {
        try{
            const response = await fetch(`http://localhost:3000/users/${id}`);
            const data = await response.json();
            setUser(data.data);
            console.log(data.data);
        }catch(err){
            console.log(err);
        }
    }
    const getCar= async () => {
        try{
            const response = await fetch(`http://localhost:3000/car/${id}`);
            const data = await response.json();
            setCar(data.data);
            console.log(data.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getUser();
        getCar();
    }
    ,[])
  return (
    <div >
        <Navbar currentPage="team" />
        <div className='car-service'>
        <div className="user-container">
            {
                user.map(user => {
                    const {id, email,first_name,last_name} = user;
                    return <article>
                    <div className='user-container-card-div'>
                        <span className='user-container-card-span'> User:
                        </span>
                        <h3>
                            {first_name}, {last_name}
                        </h3>
                    </div>
                    <div className='user-container-card-div'>
                        <span className='user-container-card-span'> Email:
                        </span>
                        <p>
                            {email}
                        </p>
                    </div>
                    <div className='user-container-card-div'>
                        <span className='user-container-card-span'> ID:
                        </span>
                        <p>
                            {id}
                        </p>   
                    </div>
                    </article>
                })
            }
        </div>
        <div className="car_container">
            {
                car.map(car => {
                    return <div key={car.id} className='car_card'>
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
                    <button className='car_button' onClick={() => handleEdit(car.id)}>Editar</button>
                    </div>
                })                
            }
        </div>
    </div>
    </div>
  )
}

export default PostUser