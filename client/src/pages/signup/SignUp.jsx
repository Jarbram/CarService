import './signUp.css'
import React, { useReducer, useMemo } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useHistory } from "react-router-dom";

const initialState={
  email:"",
  password:"",
  first_name:"",
  last_name:"",
  error:null,
}

const reducer=(state,action)=>{
  switch(action.type){
    case "updateField":
      return{...state,[action.field]:action.value};
    case "setError":
      return{...state,error:action.error};
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", state);
      console.log(response); 
      dispatch({ type: "reset" });
      history.push("/login");
    } catch (err) {
      console.error(err);
      dispatch({ type: "setError", error:"Hubo un problema" + err.message });
    }
  };

  const disabled = useMemo(() => {
    return !state.email || !state.password || !state.first_name || !state.last_name;},[state]);

  return (
    <>
    <Navbar isLoginVisible={true} currentPage="signup"/>
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
            value={state.email}
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
            value={state.password}
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
            value={state.first_name}
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
            value={state.last_name}
            onChange={handleChange}
            required
          />
        </div>
        {state.error && <div className="alert alert-danger">{state.error}</div>}
        <button  type="submit" className="btn" disabled={disabled}>
          Sign Up
        </button>
      </form>
    </div>
    </>
  );
};

export default SignUp; 