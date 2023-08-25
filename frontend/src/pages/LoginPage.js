import React, { useState } from "react";
import "../styles/components/_loginPage.scss";
import loginImage from "../assets/loginImage.webp";
import Login from "../components/Login";
import Signup from "../components/Signup";

const LoginPage = () => {
  const [signInModal, setSignInModal] = useState(true);
  const [signUpModal, setSignUpModal] = useState(false);

  const handleModal = (e) => {
    if (e.target.id === "signup") {
      setSignUpModal(true);
      setSignInModal(false);
    } else if (e.target.id === "signin") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="login-page-container">
      <div
        className="image-container"
        style={{ backgroundImage: `url(${loginImage})` }}
      ></div>
      <div className="login-form-container">
        <ul>
          <li onClick={handleModal} id="signin">
            Se connecter
          </li>
          <li onClick={handleModal} id="signup">
            Créer un compte
          </li>
        </ul>
        {signInModal && <Login />}
        {signUpModal && <Signup />}
      </div>
    </div>
  );
};

export default LoginPage;
