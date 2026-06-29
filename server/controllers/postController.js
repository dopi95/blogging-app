const Post = require("../models/Post");

const populate = (q) =>
  q
    .populate("author", "username")
    .populate("likes", "username")
    .populate("comments.author", "username")
    .populate("comments.replies.author", "username");

const getAllPosts = async (req, res) => {
  try {
    const posts = await populate(Post.find().sort({ createdAt: -1 }));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const post = await populate(Post.findOne({ slug: req.params.slug }));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user._id });
    res.status(201).json(await populate(Post.findById(post._id)));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your post" });
    const updated = await populate(
      Post.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true, runValidators: true })
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your post" });
    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Likes ──
const likePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
    const idx = post.likes.findIndex((id) => id.toString() === req.user._id.toString());
    if (idx === -1) post.likes.push(req.user._id);
    else post.likes.splice(idx, 1);
    await post.save();
    res.json({ likes: post.likes.length, liked: idx === -1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Comments ──
const addComment = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.comments.push({ author: req.user._id, text: req.body.text });
    await post.save();
    const updated = await populate(Post.findById(post._id));
    res.status(201).json(updated.comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your comment" });
    comment.deleteOne();
    await post.save();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Replies ──
const addReply = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    comment.replies.push({ author: req.user._id, text: req.body.text });
    await post.save();
    const updated = await populate(Post.findById(post._id));
    res.status(201).json(updated.comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllPosts, getPostBySlug, createPost, updatePost, deletePost,
  likePost, addComment, deleteComment, addReply,
};
