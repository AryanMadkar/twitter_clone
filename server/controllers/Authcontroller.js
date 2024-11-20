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
        .json({ message: "Username must be between 5 and 20 characters" });
    }

    if (password.length < 8 || password.length > 100) {
      return res
        .status(400)
        .json({ message: "Password must be between 8 and 100 characters" });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingEmail = await usermodel.findOne({ email });
    const existingUsername = await usermodel.findOne({ username });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new usermodel({
      fullname,
      username,
      email,
      password: hashedPassword,
      image,
      coverimage,
      bio,
      link,
      followers: [],
      following: [],
    });

    await user.save();

    generatetokensetcookie(user._id, res);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token and set it in cookies
    generatetokensetcookie(user._id, res);

    // Send user data and success message in the response
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        bio: user.bio || "",
        image: user.image || "",
        coverimage: user.coverimage || "",
        link: user.link || "",
        followers: user.followers || [],
        following: user.following || [],
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: error.message });
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
