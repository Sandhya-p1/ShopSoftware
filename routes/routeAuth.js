require("dotenv").config();
const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered" });
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid user" });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });
    const payload = { id: user_id, username: username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .json({ message: "LogIn Successful" });
  } catch (error) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
