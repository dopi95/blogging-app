const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ message: "Username or email already taken" });
    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: signToken(user._id),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: signToken(user._id),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

const getAuthors = async (req, res) => {
  try {
    const authorIds = await Post.distinct("author");
    const users = await User.find({ _id: { $in: authorIds } }).select("username createdAt");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, getMe, getAuthors };
