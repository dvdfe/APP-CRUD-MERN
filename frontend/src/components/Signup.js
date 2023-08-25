import React, { useState } from "react";
import "../styles/components/_signup.scss";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrorMessage("Les mots de passe ne correspondent pas");
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        email,
        pseudo,
        password,
        confirmPassword,
      });

      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Créer un compte</h1>
        <input
          type="email"
          placeholder="Adresse Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmez le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessage && (
          <div
            className="error-message"
            style={{ color: "red", paddingBottom: "5px" }}
          >
            {errorMessage}
          </div>
        )}
        <input type="submit" value="S'inscrire" />
      </form>
    </div>
  );
};

export default Signup;
