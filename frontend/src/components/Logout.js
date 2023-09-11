import React from "react";
import axios from "axios";

const Logout = () => {
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
      window.location.href = "/auth";
    } catch (err) {
      console.error(err);
    }
  };

  return <div onClick={handleLogout}>Déconnexion</div>;
};

export default Logout;
