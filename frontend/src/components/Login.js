import "../styles/components/_login.scss";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false); // Nouvelle variable d'état pour suivre l'acceptation des conditions

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptTerms) { // Vérifiez si les conditions sont acceptées
      setErrorMessage("Veuillez accepter les conditions générales.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, 
        }
      );
      window.location = "/";
      console.log(response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Une erreur inattendue s'est produite.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Se connecter</h1>
        <input
          type="email"
          placeholder="Adresse Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <div style={{ color: "red", paddingBottom: "5px" }}>
            {errorMessage}
          </div>
        )}
        <input
          type="checkbox"
          id="terms"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)} // Met à jour la variable d'état acceptTerms
        />
        <label htmlFor="terms">
          J'accepte les{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            conditions générales
          </a>
        </label>
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default Login;
