import React,{useState, useEffect} from 'react'
import './ListUser.css'
import { Link } from 'react-router-dom'

const ListUser = () => {
const [users, setUsers] = useState([]);

const getUsers = async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setUsers(data.data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
    getUsers();
}
,[])


  return (
    <div className='post_box'>
    <div className='post-container'>
        {
            users.map(user => {
                const {id, email,first_name,last_name} = user;
                return <Link to={`/users/${id}`} className='user-container-card'
                key={id}
                >
                <article>
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
                </Link>
            })
        }
    </div>
    </div>
  )
}

export default ListUser