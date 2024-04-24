import React from "react";
import { Navigate } from "react-router-dom";
import Tasks from "./Tickets";

function Home() {
  const userDataAvailable = localStorage.getItem("loginData");
  return (
    <>
      {userDataAvailable ? (
        <>
          <Tasks />
        </>
      ) : (
        <Navigate to="/signup" />
      )}
    </>
  );
}

export default Home;
