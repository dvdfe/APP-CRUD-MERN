import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { NavLink } from "react-router-dom";

const Profil = () => {
  const userData = useSelector((state) => state.user.data);
  const allUsers = useSelector((state) => state.user.allUsers); // Assurez-vous de récupérer le tableau d'utilisateurs

  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);
  console.log("allU:", allUsers);
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
              {userData && userData.followers ? userData.followers.length : ""}
              follower(s)
            </div>
            <div
              onClick={() => setFollowingPopup(true)}
              className="following-count"
            >
              {userData && userData.following ? userData.following.length : ""}
              suivi(e)s
            </div>
          </div>
          <div className="name-container">{userData.name}</div>
          <div className="bio-container">{userData.bio}</div>
        </div>
      </div>

      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <h3>Followers</h3>
            <ul className="followers-list">
              {allUsers &&
                allUsers
                  .filter((user) => userData.followers.includes(user._id))
                  .map((user) => (
                    <li key={user._id}>
                      <img
                        src={user.picture}
                        alt="photo de profil utilisateur"
                      />
                      <h4>{user.pseudo}</h4>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      )}

      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <h3>Suivi(e)s</h3>
            <ul className="following-list">
              {allUsers &&
                allUsers
                  .filter((user) => userData.following.includes(user._id))
                  .map((user) => (
                    <li key={user._id}>
                      <img
                        src={user.picture}
                        alt="photo de profil utilisateur"
                      />
                      <h4>{user.pseudo}</h4>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
