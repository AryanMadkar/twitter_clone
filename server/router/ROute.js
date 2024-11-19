const express = require("express");
const { signup, login, logout, getme } = require("../controllers/Authcontroller");
const protectroute = require("../middleware/Protectroute");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.get("/getme",protectroute ,getme)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logoout", logout);

module.exports = router;
