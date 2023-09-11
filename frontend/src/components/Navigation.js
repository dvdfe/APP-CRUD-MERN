import "../styles/components/_navigation.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import Profil from "./Profil";
import Post from "./Post";
import Notifications from "./Notifications";
import Messages from "./Messages";

const Navigation = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="mon-app">
          <NavLink to="/">Mon app</NavLink>
        </div>
        <div>
          <NavLink to="/">Accueil</NavLink>
        </div>
        <div>
          <NavLink><Messages/></NavLink>
        </div>
        <div>
          <NavLink><Notifications/></NavLink>
        </div>
        <div>
          <NavLink><Post/></NavLink>
        </div>
        <div>
          <NavLink>
            <Profil />
          </NavLink>
        </div>
        <div className="logout">
        <NavLink>
          <Logout />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
