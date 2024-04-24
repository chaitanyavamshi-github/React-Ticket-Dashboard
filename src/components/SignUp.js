import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateLoginStatus } from "../reduxtk/ticketSlice";

function SignUp() {
  const email = useRef();
  const password = useRef();
  const rePassword = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const saveUserInLocal = () => {
    localStorage.setItem("loginData", email.current.value);
    localStorage.setItem("passwordData", password.current.value);
    dispatch(updateLoginStatus(true));
    email.current.value = "";
    password.current.value = "";
    rePassword.current.value = "";
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    email.current.value && password.current.value && rePassword.current.value
      ? saveUserInLocal()
      : alert("Please fill all details");
  };
  return (
    <>
      <div className="form-container">
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" ref={email} placeholder="email" />
          <input type="password" ref={password} placeholder="password" />
          <input
            type="password"
            ref={rePassword}
            placeholder="retype password"
          />
          <button className="primary-button">SignUp</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
