const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getAllPosts, getPostBySlug, createPost, updatePost, deletePost,
  likePost, addComment, deleteComment, addReply,
} = require("../controllers/postController");

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);
router.post("/", protect, createPost);
router.put("/:slug", protect, updatePost);
router.delete("/:slug", protect, deletePost);

router.post("/:slug/like", protect, likePost);
router.post("/:slug/comments", protect, addComment);
router.delete("/:slug/comments/:commentId", protect, deleteComment);
router.post("/:slug/comments/:commentId/replies", protect, addReply);

module.exports = router;
