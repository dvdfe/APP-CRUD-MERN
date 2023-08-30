const Post = require("../models/post.models");
const User = require("../models/user.models");
const fs = require("fs");

exports.readPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts).sort({ createdAt: -1 });
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
    res
      .status(500)
      .json({ message: "Une erreur est survenue", error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user || !postId) {
      return res.status(400).send("Post ou utilisateur introuvable");
    } else {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $addToSet: { likers: userId },
        },
        { new: true }
      );

      res.status(200).json(updatedPost);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue", error: error.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user || !postId) {
      return res.status(400).send("Post ou utilisateur introuvable");
    } else {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likers: userId },
        },
        { new: true }
      );

      res.status(200).json(updatedPost);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue", error: error.message });
  }
};

exports.commentPost = async (req, res) => {
    try {
      const postId = req.params.id;
      const userId = req.body.userId;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).json({ message: "Utilisateur introuvable" });
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              commenterId: user._id,
              commenterPseudo: req.body.commenterPseudo,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: "Post introuvable" });
      }
  
      updatedPost.comments.sort((a, b) => b.timestamp - a.timestamp);
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Une erreur est survenue", error: error.message });
    }
  };

  exports.editCommentPost = async (req, res) => {
    try {
      const commentId = req.params.id;
      const userId = req.body.userId;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).json({ message: "Utilisateur introuvable" });
      }
  
      const updatedComment = await Post.findOneAndUpdate(
        { "comments._id": commentId, "comments.commenterId": userId },
        {
          $set: {
            "comments.$.text": req.body.text,
            "comments.$.timestamp": new Date().getTime(),
          },
        },
        { new: true }
      );
  
      if (!updatedComment) {
        return res.status(404).json({ message: "Commentaire introuvable" });
      }
  
      updatedComment.comments.sort((a, b) => b.timestamp - a.timestamp);
  
      res.status(200).json(updatedComment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Une erreur est survenue", error: error.message });
    }
  };
  exports.deleteCommentPost = (req, res) => {};
// exports.likeCommentPost = (req, res) => {};
// exports.unlikeCommentPost = (req, res) => {};
