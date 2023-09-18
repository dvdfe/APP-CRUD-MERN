import React from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";

const Profil = () => {
  const userData = useSelector((state) => state.user);
  console.log(userData.picture);
  console.log(userData.bio);

  return (
    <div className="page-container">
      <Navigation />
      <div className="info-container">
        <div className="profil-picture">
          <img src={userData.picture} alt="Photo de profil" />
        </div>
        <div className="info-profil">
          <div>{userData.pseudo}</div>
          <div className="follow-container">
            <div className="follower-count">
              {userData.followers.length} follower(s)
            </div>
            <div className="following-count">
              {userData.following.length} suivi(e)s
            </div>
          </div>
          <div className="name-container">{userData.name}</div>
          <div className="bio-container">{userData.bio}</div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
