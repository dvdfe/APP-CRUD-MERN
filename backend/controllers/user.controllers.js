const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send("ID inconnu : " + userId);
    } else {
      await User.findByIdAndRemove(userId);
      res.status(200).json({ message: "Utilisateur supprimé" });
    }
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR, error });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userIdToFollow = req.body.idToFollow;

    const user = await User.findById(userId);
    const userToFollow = await User.findById(userIdToFollow);

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
