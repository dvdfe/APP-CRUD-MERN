import React, {useState} from "react";
import {Link} from "react-router-dom"
import "../styles/components/_loginPage.scss";
import loginImage from "../assets/loginImage.webp";
import Login from "../components/Login";
import Signup from "../components/Signup";

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="login-page-container">
      <div className="image-container" style={{ backgroundImage: `url(${loginImage})` }}>
      </div>
      <div className="login-form-container">
        {/* <Signup/> */}
        <Login/>
        {/* {showSignup ? <Signup /> : <Login />}
        <p>Vous n'avez pas de compte ? <Link to="#" onClick={() => setShowSignup(!showSignup)}>S'inscrire</Link></p> */}
      </div>
    </div>
  );
};

export default LoginPage;