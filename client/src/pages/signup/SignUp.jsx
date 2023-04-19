import './signUp.css'
import React, { useState, useMemo } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState(null);
  const history = useHistory();

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
      history.push("/login");
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
    <Navbar isLoginVisible={true} />
    <div className="container">
      <form className='form-signUp' onSubmit={handleSubmit}>
      <h2 className='signUp-title'>Registrarse</h2>
        <div className="form-group">
        <label>Email</label>
          <input
            type="email"
            maxLength="50"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
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
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            maxLength="25"
            className="form-control"
            id="first_name"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            maxLength="25"
            className="form-control"
            id="last_name"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
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