import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import './login.css';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', user);
      console.log(response);
      setUser({
        email: "",
        password: "",
      });
      setError(null);
    } catch (error) {
      setError(handleErrorResponse(error));
    }
  };

  const handleErrorResponse = (error) => {
    if (error && error.response && error.response.status === 401) {
      return 'Email o contraseña incorrectos. Por favor, inténtelo de nuevo.';
    }
    return 'Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.';
  };

  const disabled = useMemo(() => {
    return !user.email.trim() || !user.password.trim();
  }, [user.email, user.password]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <>
      <Navbar />
      <div className='container'>
        <form className='form-login' onSubmit={handleLogin}>
          {error && <div className='error'>{error}</div>}
          <h2 className='title-login'>Iniciar sesión</h2>
          <div className='email-container'>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='password-container'>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Contraseña'
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <button  type="submit" className="btn" disabled={disabled}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
