const jwt = require("jsonwebtoken");

const generatetokensetcookie = async (userid, res) => {
  try {
    const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 10 * 60 * 1000, // 10 hours in milliseconds
    });
    return res.json({ message: "Token generated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = generatetokensetcookie;

