import React, { useState, useEffect } from "react";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/post")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("Erreur lors de la récupération des posts : ", error);
      });
  }, []);

  return (
    <div>
      <div className="post-list">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            <div className="post-header">
              <div className="user-info">
                <img
                  src={post.userId} // Remplacez par le chemin de l'avatar de l'utilisateur
                  alt={`Avatar de ${post.userId}`}
                />
                <h4>{post.userName}</h4>
              </div>
              <div className="post-timestamp">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
            {post.image && (
              <img
                src={post.image}
                alt="Image du post"
                className="post-image"
              />
            )}
            <p className="post-message">{post.message}</p>
            <div className="post-actions">
              <button>Like</button>
              <button>Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
