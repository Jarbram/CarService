
import './login.css'
import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", { email, password });
      setUser(response.data);
    } catch (error) {
      setError("Email o contraseña incorrectos");
      console.error(error);
    }
  };

  return (
    <div> 
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</    div>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.  target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</  label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.   target.value)}
            />
          </div>
          <button type="submit">Iniciar sesión</    button>
        </form>
    </div>
  );
};

export default Login;

