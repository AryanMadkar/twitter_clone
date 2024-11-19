const bcryptjs = require("bcryptjs");
const usermodel = require("../model/usermodel");
const generatetokensetcookie = require("../libs/GEneratewebtoken");

const signup = async (req, res) => {
  try {
    const {
      fullname,
      username,
      email,
      password,
      image,
      coverimage,
      bio,
      link,
    } = req.body;
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (fullname.length < 5 || fullname.length > 50) {
      return res
        .status(400)
        .json({ message: "Fullname must be between 5 and 50 characters" });
    }
    if (username.length < 5 || username.length > 20) {
      return res
        .status(400)
        .json({ message: "Username must be between 5 and 50 characters" });
    }
    if (password.length < 8 || password.length > 100) {
      return res
        .status(400)
        .json({ message: "Password must be between 8 and 100 characters" });
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (image && image.length > 1000000) {
      return res
        .status(400)
        .json({ message: "Image size must be less than 1MB" });
    }
    if (coverimage && coverimage.length > 1000000) {
      return res
        .status(400)
        .json({ message: "Cover image size must be less than 1MB" });
    }
    if (bio && bio.length > 200) {
      return res
        .status(400)
        .json({ message: "Bio must be less than 200 characters" });
    }
    if (link && link.length > 100) {
      return res
        .status(400)
        .json({ message: "Link must be less than 100 characters" });
    }
    const existingemail = await usermodel.findOne({ email });
    const existingusername = await usermodel.findOne({ username });
    if (existingemail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (existingusername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = new usermodel({
      fullname,
      username,
      email,
      password: hashedPassword,
      image,
      coverimage,
      bio,
      link,
    });

    if (user) {
      generatetokensetcookie(user._id, res);
      await user.save();
      res
        .status(201)
        .json({ message: "User created successfully", user: user });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    generatetokensetcookie(user._id, res);
    res.json({ message: "Logged in successfully", user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getme = async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login, logout, getme };
