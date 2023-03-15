import './signUp.css'
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/signup', user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={user.password} onChange={handleInputChange} />
        </div>
        <div>
          <label>First Name</label>
          <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="last_name" value={user.last_name} onChange={handleInputChange} />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
