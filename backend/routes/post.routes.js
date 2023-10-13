const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const postCtrl = require("../controllers/post.controllers");
const multer = require("../middleware/multer-config");

//Routes pour les posts
router.get("/", postCtrl.readPost);
router.post("/",auth, multer, postCtrl.createPost);
router.put("/:id",auth, multer, postCtrl.modifyPost);
router.delete("/:id",auth, postCtrl.deletePost);
router.patch("/like/:id",auth, postCtrl.likePost);
router.patch("/unlike/:id",auth, postCtrl.unlikePost);

//Routes pour les comments
router.patch("/comment-post/:id",auth, postCtrl.commentPost);
router.patch("/edit-comment-post/:id",auth, postCtrl.editCommentPost);
router.patch("/delete-comment-post/:id",auth, postCtrl.deleteCommentPost);
// router.patch("/like-comment-post/:id", postCtrl.likeCommentPost)
// router.patch("/unlike-comment-post/:id", postCtrl.unlikeCommentPost)

module.exports = router;
