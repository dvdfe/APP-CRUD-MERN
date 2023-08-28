const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/user.controllers");
const authCtrl = require("../controllers/auth.controllers");

//Création de compte, connexion et deconnexion
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout)

//Routes pour différentes fonctions
router.get("/get-all-users", auth, userCtrl.getAllUsers);
router.get("/user-info/:id",auth, userCtrl.userInfo);
router.delete("/:id",auth, userCtrl.deleteUser);
router.put("/:id",auth, userCtrl.updateUser);
router.patch("/follow/:id",auth, userCtrl.followUser);
router.patch("/unfollow/:id",auth, userCtrl.unfollowUser);

module.exports = router;
