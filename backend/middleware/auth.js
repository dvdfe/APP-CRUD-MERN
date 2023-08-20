const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Token d'authentification manquant" });
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token d'authentification manquant" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = {
      userId: decodedToken.userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Token d'authentification invalide ou expiré" });
  }
};
