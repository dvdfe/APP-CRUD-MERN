const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controllers")

//Routes pour les posts
router.get("/", postCtrl.readPost)
router.post("/", postCtrl.createPost)
router.put("/:id", postCtrl.modifyPost)
router.delete("/:id", postCtrl.deletePost)
router.patch("/like/:id", postCtrl.likePost)
router.patch("/unlike/:id", postCtrl.unlikePost)


//Routes pour les comments
router.patch("/comment-post/:id", postCtrl.commentPost)
router.patch("/edit-comment-post/:id", postCtrl.editCommentPost)
router.patch("/delete-comment-post/:id", postCtrl.deleteCommentPost)
// router.patch("/like-comment-post/:id", postCtrl.likeCommentPost)
// router.patch("/unlike-comment-post/:id", postCtrl.unlikeCommentPost)

module.exports = router