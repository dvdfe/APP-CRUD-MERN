import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { followUser, unfollowUser } from "../feature/userSlice"; // Assurez-vous d'importer unfollowUser

const FollowHandler = ({ idToFollow }) => {
  const dispatch = useDispatch();
  console.log("l'id:", idToFollow);
  const userData = useSelector((state) => state.user.data);
  const [isFollowed, setIsFollowed] = useState(false);

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  const handleFollow = () => {
    axios
      .patch(`http://localhost:3000/user/follow/${idToFollow}`) // Assurez-vous d'utiliser la route correcte
      .then((res) => {
        // Utilisez la réponse pour mettre à jour le suivi dans le Redux
        dispatch(followUser(idToFollow));
      })
      .catch((error) => {
        console.error("Erreur lors du suivi de l'utilisateur :", error);
      });
  };

  const handleUnfollow = () => {
    axios
      .patch(`http://localhost:3000/user/unfollow/${idToFollow}`) // Assurez-vous d'utiliser la route correcte
      .then((res) => {
        // Utilisez la réponse pour mettre à jour le désabonnement dans le Redux
        dispatch(unfollowUser(idToFollow));
      })
      .catch((error) => {
        console.error("Erreur lors du désabonnement de l'utilisateur :", error);
      });
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <div>
      {isFollowed ? (
        <span>
          <button onClick={handleUnfollow}>Suivi(e)</button>
        </span>
      ) : (
        <span>
          <button onClick={handleFollow}>Follow</button>
        </span>
      )}
    </div>
  );
};

export default FollowHandler;
