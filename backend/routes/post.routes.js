const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controllers")


router.get("/", postCtrl.readPost)
router.post("/", postCtrl.createPost)
router.put("/:id", postCtrl.modifyPost)
router.delete("/:id", postCtrl.deletePost)
router.patch("/like/:id", postCtrl.likePost)
router.patch("/unlike/:id", postCtrl.unlikePost)

module.exports = router