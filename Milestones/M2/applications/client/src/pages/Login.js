import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { hostname } from '../App.js';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useNavigate(); //TEMPORARY COMMENTOUT FOR TESTING

  const login = () => {
    const data = { username: username, password: password }
    axios.post("http://" + hostname + "/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      }
      else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({ username: response.data.username, id: response.data.id, status: true });
        history('/', { replace: true }); //TEMPORARY COMMENTOUT FOR TESTING
      }
    })
  }
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value)
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  )
}

export default Login
