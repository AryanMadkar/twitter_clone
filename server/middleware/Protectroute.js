const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const protectroute = async (req, res, next) => {
  try {
    const cookies = req.cookies.token;
    if (!cookies) {
      return res.status(401).json({ message: "You are not authenticated" });
    }
    const decoded = jwt.verify(cookies, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "authenticated invalid token" });
    }
    const user = await usermodel.findById(decoded.userid).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = protectroute;
