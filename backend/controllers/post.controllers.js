const Post = require("../models/post.models");
const User = require("../models/user.models");
const fs = require("fs");

exports.readPost = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Pas de posts trouvés", error: error.message });
  }
};

exports.createPost = (req, res, next) => {
  const { posterId, message, video } = req.body;
  const newPost = new Post({
    posterId,
    message,
    image: "",
    video,
    likers: [],
    comments: [],
  });
  if (req.file) {
    newPost.image = `${req.protocol}://${req.get("host")}/uploads/posts/${
      req.file.filename
    }`;
  }

  newPost
    .save()
    .then((post) => {
      console.log(post);
      res.status(201).json({ message: "Post créé: ", post });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.modifyPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.auth.userId; 

    let post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send("Post introuvable : " + postId);
    }

    if (post.userId !== userId) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    if (req.file) {
      post.image = `${req.protocol}://${req.get("host")}/uploads/posts/${
        req.file.filename
      }`;
    }
    post.message = req.body.message;
    post.video = req.body.video;
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
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
    const userId = req.auth.userId; 

    if (post.userId !== userId) {
      return res.status(401).json({ message: "Non autorisé" });
    }

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
exports.deleteCommentPost = async (req, res) => {
  try {
    const commentId = req.body.commentId;

    if (!commentId) {
      return res.status(400).json({ message: "ID du commentaire manquant" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: { _id: commentId },
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: "Post ou commentaire introuvable" });
    }

    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue", error: error.message });
  }
};
// exports.likeCommentPost = (req, res) => {};
// exports.unlikeCommentPost = (req, res) => {};
