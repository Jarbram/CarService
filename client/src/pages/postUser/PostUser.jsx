import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import ModalStatus from '../../components/modalStatus/ModalStatus'
import './PostUser.css'
import CreateCarModal from '../../components/createCarModal/CreateCarModal'

const PostUser = () => {
    const [user, setUser] = useState([]);
    const [car, setCar] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const {id} = useParams();

    const handleEdit = (car) => {
      setSelectedCar(car);
      setShowModal(true);
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleCreate = () => {
      setShowModalCreate(true);
    };
    const handleCloseModalCreate = () => {
      setShowModalCreate(false);
    };

    const getUser = async () => {
        try{
            const response = await fetch(`http://localhost:3000/users/${id}`);
            const data = await response.json();
            setUser(data.user);
        }catch(err){
            console.log(err);
        }
    }
    const getCar= async () => {
        try{
            const response = await fetch(`http://localhost:3000/car/user/${id}`);
            const data = await response.json();
            console.log(data);
            setCar(data.data);
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
                  <article>
                    <div className='user-container-card-div'>
                        <span className='user-container-card-span'> User:
                        </span>
                        <h3>
                            {user.first_name}, {user.last_name}
                        </h3>
                    </div>
                    <div className='user-container-card-div'>
                        <span className='user-container-card-span'> Email:
                        </span>
                        <p>
                            {user.email}
                        </p>
                    </div>
                    <div className='user-container-card-div'>
                        <span className='user-container-card-span'> ID:
                        </span>
                        <p>
                            {user.id}
                        </p>   
                    </div>
                    </article>


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
                    <button className='car_button' onClick={() => handleEdit(car)}>Edit</button>
                    {
                      showModal && (
                        <ModalStatus
                          carId={selectedCar.user_id}
                          onClose={handleCloseModal}
                          onUpdate={getCar}
                        />
                      )
                    }
                    </div>
                })                
            }
        </div>
        <button className='car_button' onClick={() => handleCreate()}>Create new car for service</button>
        {
          showModalCreate && (
            <CreateCarModal 
            userID={id}
            onClose={handleCloseModalCreate}
            onUpdate={getCar}
            />
          )
        }
    </div>
    </div>
  )
}

export default PostUser