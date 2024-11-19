const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
    },
    followers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
    image: {
      type: String,
      default: "/profile.avif",
    },
    coverimage: {
      type: String,
      default: "/coverdef.jpg",
    },
    bio: {
      type: String,
      default: "Hi I am using tweeter clone",
    },
    link: {
      type: String,
      default: "",
    },
    likedpost:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default:[]
      }
    ]
  },
  { timestamps: true }
);

const usermodel = mongoose.model("User", userschema);

module.exports = usermodel;
