import "../styles/components/_navigation.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import logoImage from "../assets/vecteur-degrade-logo-colore-oiseau_343694-1365.avif"; // Importez votre image de logo ici

const Navigation = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="icons">
          <div className="icones-bis">
            <NavLink to="/">
              <img className="logo-app" src={logoImage} alt="logo site" />
            </NavLink>
          </div>
          <br />
          <div>
            <NavLink to="/">Accueil</NavLink>
          </div>
          <br />
          <div>
            <NavLink to="/messages">Messages</NavLink>
          </div>
          <br />
          <div>
            <NavLink to="/notifications">Notifications</NavLink>
          </div>
          <br />
          <div>
            <NavLink to="/post">Publier</NavLink>
          </div>
          <br />
          <div>
            <NavLink to="/profil">Profil</NavLink>
          </div>
          <div className="logout">
          <NavLink to="/logout"><Logout /></NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
