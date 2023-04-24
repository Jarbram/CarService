import React, { useReducer, useEffect, useMemo } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import './login.css';
import {BiShow} from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

const initialState = {
  showPassword:false,
  user: {
    email: "",
    password: "",
  },
  error: null,
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SHOW_PASSWORD':
      return { ...state, showPassword: action.payload };
    case 'SET_USER':
      return { ...state, user:{...state.user, ...action.payload} };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      throw new Error('Invalid action type');
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
 
  const handleShowPassword = () => {
    dispatch({ type: 'SET_SHOW_PASSWORD', payload: !state.showPassword });
  };

  const handleChange = (e) => {
    dispatch({ type: 'SET_USER', payload: { [e.target.name]: e.target.value } });
  };

  const handleErrorResponse = (error) => {
    if (error && error.response && error.response.status === 401) {
      return 'Email o contraseña incorrectos. Por favor, inténtelo de nuevo.';
    }
    return 'Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.';
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', state.user);
      console.log(response);
      dispatch({ type: 'RESET' });
      history.push('/home');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: handleErrorResponse(error) });
    }
  };

  const disabled = useMemo(() => {
    return !state.user.email.trim() || !state.user.password.trim();
  }, [state.user.email, state.user.password]);

  useEffect(() => {
    if (state.error) {
      console.log(state.error);
    }
  }, [state.error]);

  return (
    <>
      <Navbar isSignUpVisible={true} currentPage="home" />
      <div className='container'>
        <form className='form-login' onSubmit={handleLogin}>
          {state.error && <div className='error'>{state.error}</div>}
          <h2 className='title-login'>Iniciar sesión</h2>

          <label>Email</label>
          <div className='email-container'>
            <input
              type='email'
              id='email'
              name='email'
              value={state.user.email}
              onChange={handleChange}
              required
            />
          </div>
          <label>Password</label>
          <div className='password-container'>
            <input
              type={state.showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={state.user.password}
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
