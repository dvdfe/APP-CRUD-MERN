const Post = require("../models/post.models");
const post = require("../models/post.models");
const fs = require("fs");

exports.readPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Pas de posts trouvés", error: error.message });
  }
};

exports.createPost = (req, res, next) => {
  const { postId, message, video } = req.body;
  const newPost = new Post({
    postId,
    message,
    video,
    likers: [],
    comments: [],
  });

  try {
    newPost
      .save()
      .then((post) => {
        console.log(post);
        res.status(201).json({ message: "Post créé: ", post });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.modifyPost = async (req, res) => {
  try {
    const postId = req.params.id;
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send("Post introuvable : " + postId);
    } else {
      post.message = req.body.message;
      post.video = req.body.video;
      const updatedPost = await post.save();

      res.status(200).json(updatedPost);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue", error: error.message });
  }
};

exports.deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(400).send("Post introuvable : " + postId);
      } else {
        await Post.findByIdAndRemove(postId); 
        res.status(200).json({ message: "Post supprimé" });
      }
    } catch (error) {
      res.status(500).json({ message: "Une erreur est survenue", error: error.message });
    }
  };
  

  exports.likePost = async (req, res) => {
    // try {
    //     const postId = req.params.id;
    //     const postIdToLike = req.body.idTolike;
    
    //     const user = await User.findById(userId);
    //     const userToFollow = await User.findById(userIdToFollow);
    
    //     if (!user || !userToFollow) {
    //       return res.status(400).send("ID inconnu : " + userId);
    //     }
    
    //     user.following.addToSet(userIdToFollow);
    //     userToFollow.followers.addToSet(userId);
    
    //     const updatedUser = await user.save();
    //     const updatedUserToFollow = await userToFollow.save();
    
    //     res.status(201).json({ updatedUser, updatedUserToFollow });
    //   } catch (error) {
    //     res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR, error });
    //   }
    
  }


  exports.dislikePost = (req, res) => {
      
  }