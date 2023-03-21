
import './login.css'
import React, { useState } from "react";
import axios from "axios";
import Navbar from '../navbar/Navbar.jsx'

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });
      setUser(response.data);
    } catch (error) {
      setError("Email o contraseña incorrectos");
      console.error(error);
    }
  };

  return (
    <>
    <Navbar />
    <div className='container'> 
        <form className='form-login' onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <h2 className='title-login'>Iniciar sesión</h2>
          <div className='email-container'>
            <input
              type="email"
              id="email"
              placeholder='Email'
              value={email}
              onChange={(event) => setEmail(event.  target.value)}
            />
          </div>
          <div className='password-container'>
            <input
              type="password"
              id="password"
              placeholder='Password'
              value={password}
              onChange={(event) => setPassword(event.   target.value)}
            />
          </div>
          <button className='btn' type="submit">Iniciar sesión</button>
        </form>
    </div>
    </>
  );
};

export default Login;

