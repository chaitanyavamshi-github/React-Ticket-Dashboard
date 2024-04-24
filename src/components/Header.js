import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateLoginStatus } from "../reduxtk/ticketSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var loginStatus = useSelector((state) => state.loginStatus);
  const signUp = () => {
    dispatch(updateLoginStatus(false));
    navigate("/login");
  };
  const handleClick = () => {
    loginStatus ? signUp() : navigate("/login");
  };
  return (
    <>
      <div className="header-container">
        <div>LOGO</div>
        {loginStatus ? (
          <button className="primary-button" onClick={handleClick}>
            Logout
          </button>
        ) : (
          <button className="primary-button" onClick={handleClick}>
            Login
          </button>
        )}
      </div>
    </>
  );
}

export default Header;
