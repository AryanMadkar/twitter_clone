const express = require("express");
const protectroute = require("../middleware/Protectroute");
const {
  getuserprofile,
  update,
  followfollowers,
  getsuggestion,
} = require("../controllers/Usercontrollers");

const router2 = express.Router();

router2.get("/", (req, res) => {
  res.send("Welcome to user routes");
});

router2.get("/profile/:username", protectroute, getuserprofile);
router2.get("/suggested", protectroute, getsuggestion);
router2.post("/follow/:id", protectroute, followfollowers);
router2.post("/update", protectroute, update);

module.exports = router2;
