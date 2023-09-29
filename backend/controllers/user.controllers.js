const User = require("../models/user.models");
const Post = require("../models/post.models");
const fs = require("fs")


const ERROR_MESSAGES = {
  DUPLICATE_EMAIL: "Cette adresse e-mail est déjà utilisée",
  DUPLICATE_PSEUDO: "Ce pseudo est déjà utilisé",
  PASSWORD_MISMATCH: "Les mots de passe ne correspondent pas",
  INVALID_CREDENTIALS: "Paire identifiant/mot de passe incorrecte",
  INTERNAL_ERROR: "Une erreur interne est survenue",
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR, error });
  }
};

exports.userInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).send("ID inconnu : " + userId);
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR, error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send("ID inconnu : " + userId);
    } else {
      user.bio = req.body.bio;
      user.name = req.body.name

      if (req.file) {
        user.picture = `${req.protocol}://${req.get("host")}/uploads/profil/${req.file.filename}`;
      }

      const updatedUser = await user.save();

      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR, error });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Supprimer les posts de l'utilisateur s'ils existent
    await Post.deleteMany({ userId: userId });
    console.log("1");
    // Supprimer les commentaires de l'utilisateur sur tous les posts s'ils existent
    await Post.updateMany(
      {},
      { $pull: { comments: { commenterId: userId } } },
      { multi: true }
    );
    console.log("2");

    // Supprimer les likes de l'utilisateur sur tous les posts s'ils existent
    await Post.updateMany({}, { $pull: { likers: userId } }, { multi: true });
    console.log("3");

    // Supprimer l'utilisateur s'il existe
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    console.log("4");

    res
      .status(200)
      .json({ message: "Utilisateur et ses contenus associés supprimés" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue", error: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userIdToFollow = req.body.idToFollow;

    const user = await User.findById(userId);
    const userToFollow = await User.findById(userIdToFollow);
    console.log('userID:', userId)
    console.log('userIDTofollow:', userToFollow)

    if (!user || !userToFollow) {
      return res.status(400).send("ID inconnu : " + userId);
    }

    user.following.addToSet(userIdToFollow);
    userToFollow.followers.addToSet(userId);

    const updatedUser = await user.save();
    const updatedUserToFollow = await userToFollow.save();

    res.status(201).json({ updatedUser, updatedUserToFollow });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR, error });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userIdToUnfollow = req.body.idToUnfollow;

    const user = await User.findById(userId);
    const userToUnfollow = await User.findById(userIdToUnfollow);

    if (!user || !userToUnfollow) {
      return res.status(400).send("ID inconnu : " + userId);
    }

    user.following.pull(userIdToUnfollow);
    userToUnfollow.followers.pull(userId);

    const updatedUser = await user.save();
    const updatedUserToUnfollow = await userToUnfollow.save();

    res.status(201).json({ updatedUser, updatedUserToUnfollow });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR, error });
  }
};
