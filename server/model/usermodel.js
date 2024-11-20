const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
  },
  image: String,
  coverimage: String,
  bio: {
    type: String,
    maxlength: 200,
  },
  link: {
    type: String,
    maxlength: 100,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Ensure followers use valid ObjectIDs
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const usermodel = mongoose.model("User", userSchema);
module.exports = usermodel;
