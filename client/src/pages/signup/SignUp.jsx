import './signUp.css'
import React, { useReducer, useMemo } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useHistory } from "react-router-dom";

// Definition the initial state of the form
const initialState={
  email:"",
  password:"",
  first_name:"",
  last_name:"",
  error:null,
}

// create the reducer function with the actions for updating the state
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
  //use the reducer for handle the state of the form
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get the history object from the react-router-dom
  const history = useHistory();

  // Handle the history of the navigation
  const handleChange = (e) => {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    })
  };

  // Sent the data to the server
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

  // Disable the button if the fields are empty
  const disabled = useMemo(() => {
    return !state.email || !state.password || !state.first_name || !state.last_name;},[state]);

    // Render the form
  return (
    <>
    <Navbar isLoginVisible={true} currentPage=""/>
    <div className="container">
      <form className='form-signUp' onSubmit={handleSubmit}>
      <h2 className='signUp-title'>Register</h2>
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