const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers")
const authCtrl = require("../controllers/auth.controllers")

router.post("/signup", authCtrl.signup)
router.post("/login",  authCtrl.login)


router.get("/getallusers", userCtrl.getAllUsers)
router.get("/userinfo/:id", userCtrl.userInfo)
router.put("/:id", userCtrl.updateUser)
router.patch("/follow/:id", userCtrl.followUser)
router.patch("/unfollow/:id", userCtrl.unfollowUser)

module.exports = router;
