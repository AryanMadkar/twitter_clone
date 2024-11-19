require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const dbconnect = require("./db/db");
const router = require("./router/ROute");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use("/clone/v1", router);

const server = () => {
  dbconnect();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

server();
