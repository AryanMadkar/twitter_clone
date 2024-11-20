const express = require("express");
const protectroute = require("../middleware/Protectroute");
const {
  getnotification,
  delnotification,
} = require("../controllers/notificationcontrollers");
const router4 = express.Router();

router4.get("/", protectroute, getnotification);
router4.delete("/", protectroute, delnotification);

module.exports = router4;
