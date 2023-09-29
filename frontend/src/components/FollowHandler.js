import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { followUser, unfollowUser } from "../feature/userSlice";

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
    const userId = userData.userID;
    const requestBody = {
      idToFollow: idToFollow,
    };
    setIsFollowed(true);

    axios
      .patch(`http://localhost:3000/user/follow/${userId}`, requestBody)
      .then((res) => {
        dispatch(followUser(idToFollow));
      })
      .catch((error) => {
        console.error("Erreur lors du suivi de l'utilisateur :", error);
        setIsFollowed(false);
      });
  };
  const handleUnfollow = () => {
    const userId = userData.userID;
    const requestBody = {
      idToUnfollow: idToFollow,
    };
    setIsFollowed(false);

    axios
      .patch(`http://localhost:3000/user/unfollow/${userId}`, requestBody) // Assurez-vous d'utiliser la route correcte
      .then((res) => {
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
          <button onClick={handleUnfollow}>Unfollow</button>
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
