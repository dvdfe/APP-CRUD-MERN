import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FollowHandler = ({ idToFollow }) => {
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

  const handleFollow = () => {};
  const handleUnfollow = () => {};

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <div>
      {isFollowed && (
        <span>
          <button>Abonné</button>
        </span>
      )}
      {isFollowed === false && (
        <span>
          <button>Suivre</button>
        </span>
      )}
    </div>
  );
};

export default FollowHandler;
