const mongoose = require("mongoose");

const postschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    minlength: 1,
    maxlength: 500,
  },
  image: {
    type: String,
    default: "",
  },
  likes: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  ],
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
});

const postmodel = mongoose.model("Post", postschema);

module.exports = postmodel;
