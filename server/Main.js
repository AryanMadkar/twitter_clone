require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const dbconnect = require("./db/db");
const router = require("./router/ROute");
const router2 = require("./router/usersroute");
const v2 = require("cloudinary");
const router3 = require("./router/postroutes");
const router4 = require("./router/notificationroutes");

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's URL
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use("/clone/auth/v1", router);
app.use("/clone/users/v1", router2);
app.use("/clone/post/v1", router3);
app.use("/clone/notification/v1", router4);

const server = () => {
  dbconnect();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

server();
