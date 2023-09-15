import React from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";

const Profil = () => {
const userData = useSelector((state) => state.user)
console.log(userData.picture);
console.log(userData.bio);



  return (
    <div>
      <Navigation />
      <div className="info-container">
        <div className="profil-picture"><img src={userData.picture} alt="Photo de profil" /></div>
        <div className="info-profil"></div>
      </div>
    </div>
  );
};

export default Profil;
