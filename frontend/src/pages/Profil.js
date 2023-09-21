import { useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { NavLink } from "react-router-dom";

const Profil = () => {
  const userData = useSelector((state) => state.user);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  

  return (
    <div className="page-container">
      <Navigation />
      <div className="info-container">
        <div className="profil-picture">
          <img src={userData.picture} alt="Photo de profil" />
        </div>
        <div className="info-profil">
          <div className="username">
            <strong>{userData.pseudo}</strong>
            <NavLink to="../edit-profil" className="edit-profile-button">
              Modifier le profil
            </NavLink>
          </div>
          <div className="follow-container">
            <div
              onClick={() => setFollowersPopup(true)}
              className="follower-count"
            >
              {userData ? userData.followers.length : ""} follower(s)
            </div>
            <div
              onClick={() => setFollowingPopup(true)}
              className="following-count"
            >
              {userData ? userData.following.length : ""} suivi(e)s
            </div>
          </div>
          <div className="name-container">{userData.name}</div>
          <div className="bio-container">{userData.bio}</div>
        </div>
      </div>
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Followers</h3>
            <span className="cross" onClick={()=>setFollowersPopup(false)}>&#10005;</span>
            <ul>

            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
