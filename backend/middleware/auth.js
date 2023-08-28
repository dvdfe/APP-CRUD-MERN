const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt; 

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