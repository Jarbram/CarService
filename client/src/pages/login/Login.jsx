import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import './login.css';
import {BiShow} from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  }
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
      history.push('/home');
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
      <Navbar isSignUpVisible={true}/>
      <div className='container'>
        <form className='form-login' onSubmit={handleLogin}>
          {error && <div className='error'>{error}</div>}
          <h2 className='title-login'>Iniciar sesión</h2>

          <label>Email</label>
          <div className='email-container'>
            <input
              type='email'
              id='email'
              name='email'
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <label>Password</label>
          <div className='password-container'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={user.password}
              onChange={handleChange}
              required
            />
            <BiShow className='show-password' onClick={handleShowPassword} />
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