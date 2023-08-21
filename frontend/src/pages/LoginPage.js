import React, { useEffect, useState } from "react";
import loginImage from "../assets/loginImage.webp";
import axios from "axios";

const LoginPage = () => {
//   const handleForm = (e) => {
//     axios.post("http://localhost:3000/auth/login");
//   };

  return (
    <div className="loginPage-container">
      <div className="image-container">
        <img src={loginImage} alt="Image avec texture et motif" />
      </div>
      <form
        className="login-form-container"
        onSubmit={(e) => handleForm(e.target.value)}
      >
        <h1>Se connecter</h1>
        <input type="text" placeholder="Adresse Email" />
        <input type="password" placeholder="Mot de passe" />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default LoginPage;
