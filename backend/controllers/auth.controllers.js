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

//Inscription au site
exports.signup = async (req, res, next) => {
  const { email, pseudo, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const existingPseudo = await User.findOne({ pseudo });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.DUPLICATE_EMAIL, error });
    }

    if (existingPseudo) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.DUPLICATE_PSEUDO, error });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.PASSWORD_MISMATCH, error });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      email: email,
      pseudo: pseudo,
      password: hash,
    });

    await user.save();
    res.status(201).json({ message: "Utilisateur créé" });
  } catch (error) {
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR, error });
  }
};

//Connexion au site
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
          }

          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
          });

          res.status(200).cookie("jwt", token, { httpOnly: true }).json({
            userID: user._id,
            pseudo: user.pseudo,
            token: token,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            likes: user.likes,
            picture: user.picture,
            name: user.name
          });
        })
        .catch(() => {
          res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_ERROR });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

//Deconnexion au site
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Déconnexion réussie" });
};
