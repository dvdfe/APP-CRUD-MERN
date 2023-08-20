const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Les mots de passe ne correspondent pas" });
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        email: email,
        password: hash,
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) =>
      res.status(500).json({ message: "Une erreur interne est survenue" })
    );
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                userID: user._id,
                token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ message: "Erreur serveur" });
          });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
