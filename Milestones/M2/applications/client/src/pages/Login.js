import React, { useState, useContext } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { hostname } from "../App.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  // let history = useNavigate(); //TEMPORARY COMMENTOUT FOR TESTING

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://" + hostname + "/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        //history("/", { replace: true }); //TEMPORARY COMMENTOUT FOR TESTING
      }
    });
  };
  return (
    <div className="loginContainer">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        placeholder="Enter username"
        data-testid="username"
        id="username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        placeholder="Enter password"
        data-testid="password"
        name="password"
        id="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button role="button" onClick={login} data-testid="button" type="submit"> Login
      </button>
    </div>
  );
}

export default Login;
