import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateLoginStatus } from "../reduxtk/ticketSlice";

function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invalidUser = () => {
    alert("Invalid User");
  };
  const login = () => {
    navigate("/");
    dispatch(updateLoginStatus(true));
  };
  const validateUser = () => {
    const validEmail = localStorage.getItem("loginData");
    const validPassword = localStorage.getItem("passwordData");
    validEmail === email.current.value &&
    validPassword === password.current.value
      ? login()
      : invalidUser();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    email.current.value && password.current.value
      ? validateUser()
      : alert("Invalid User");
  };
  return (
    <>
      <div className="form-container">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" ref={email} placeholder="email" />
          <input type="password" ref={password} placeholder="password" />
          <button className="primary-button">Login</button>
          <Link to="/signup">SignUp</Link>
        </form>
      </div>
    </>
  );
}

export default Login;
