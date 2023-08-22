import React from "react";
import "../styles/components/_login.scss"

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Se connecter</h1>
        <input type="email" placeholder="Adresse Email" />
        <input type="password" placeholder="Mot de passe" />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default Login;
