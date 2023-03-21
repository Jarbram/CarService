import './signUp.css'
import React, { useState, useMemo } from "react";
import axios from "axios";
import Navbar from '../navbar/Navbar.jsx'

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", user);
      console.log(response); 
      setUser({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      });
    } catch (err) {
      console.error(err);
      setError("Hubo un problema: " + err.message);
    }
  };

  const disabled = useMemo(() => {
    return !user.email || !user.first_name || !user.last_name || !user.password;
  }, [user.email, user.first_name, user.last_name, user.password]);

  return (
    <>
    <Navbar />
    <div className="container">
      <form className='form-signUp' onSubmit={handleSubmit}>
      <h2 className='signUp-title'>Registrarse</h2>
        <div className="form-group">
          <input
            type="email"
            maxLength="50"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            minLength="8"
            maxLength="100"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            maxLength="25"
            className="form-control"
            id="first_name"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            required
            placeholder="Your first name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            maxLength="25"
            className="form-control"
            id="last_name"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
            placeholder="Your last name"
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button  type="submit" className="btn" disabled={disabled}>
          Sign Up
        </button>
      </form>
    </div>
    </>
  );
};

export default SignUp; 