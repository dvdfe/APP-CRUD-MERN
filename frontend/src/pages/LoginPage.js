import React from "react";
import "../styles/components/_loginPage.scss";
import loginImage from "../assets/loginImage.webp";
import Login from "../components/Login";
import axios from "axios";
import Signup from "../components/Signup";

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="image-container" style={{ backgroundImage: `url(${loginImage})` }}>
      </div>
      <div className="login-form-container">
        {/* <Login /> */}
        <Signup/>
      </div>
    </div>
  );
};

export default LoginPage;
