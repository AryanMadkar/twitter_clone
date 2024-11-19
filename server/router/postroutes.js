const express = require("express");
const protectroute = require("../middleware/Protectroute");
const {
  createpost,
  likeunlikepost,
  commentinpost,
  deleteost,
  getallposts,
  getlikepost,
  getfollowingpost,
  getuserpost,
} = require("../controllers/postcontrollers");

const router3 = express.Router();

router3.get("/", (req, res) => {
  res.send("Welcome to user routes");
});

router3.post("/createpost", protectroute, createpost);
router3.post("/likeunlikepost/:id", protectroute, likeunlikepost);
router3.post("/commentpost/:id", protectroute, commentinpost);
router3.delete("/:id", protectroute, deleteost);
router3.get("/all",protectroute,getallposts)
router3.get("/getlikedpost",protectroute,getlikepost)
router3.get("/getfollwingposts",getfollowingpost)
router3.get("/users/:username",getuserpost)


module.exports = router3;
