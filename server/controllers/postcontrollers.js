const notificarionmodel = require("../model/notificationmodel");
const postmodel = require("../model/postmodel");
const usermodel = require("../model/usermodel");
const v2 = require("cloudinary");
const createpost = async (req, res) => {
  try {
    const { text } = req.body;
    const { image } = req.body;
    const userid = req.user._id;
    const user = await usermodel.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!text && !image) {
      return res.status(400).json({ message: "Please provide text or image" });
    }
    if (image) {
      const imageuplode = await v2.uploader.upload(image);
      if (!imageuplode.secure_url) {
        return res.status(400).json({ message: "Failed to upload image" });
      }
      image = imageuplode.secure_url;
    }
    const newpost = new postmodel({
      user: userid,
      text,
      image,
    });
    await newpost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newpost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const likeunlikepost = async (req, res) => {
  try {
    const userid = req.user._id;
    const { id: postid } = req.params.id;
    const Post = await postmodel.findById(userid);
    if (!Post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userlikedpost = Post.likes.include(userid);
    if (userlikedpost) {
      await Post.updateOne({ _id: postid }, { $pull: { likes: userid } });
      await usermodel.updateOne(
        { _id: userid },
        { $pull: { likedpost: postid } }
      );

      return res.json({ message: "Post unliked successfully" });
    } else {
      Post.likes.push(userid);
      await usermodel.updateOne(
        { _id: userid },
        { $push: { likedpost: postid } }
      );
      await Post.save();
      const notification = new notificarionmodel({
        from: userid,
        to: Post.user,
        type: "like",
      });
      await notification.save();
      return res.json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteost = async (req, res) => {
  try {
    const post = await postmodel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to comment on this post" });
    }
    if (post.image) {
      const imageid = post.image.split("/").pop().split(".")[0];
      const result = await v2.uploader.destroy(imageid);
    }
    await postmodel.findByIdAndDelete(request.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const commentinpost = async (req, res) => {
  try {
    const { text } = req.body;
    const postid = req.params.id;
    const user = req.user._id;
    if (!text) {
      return res.status(400).json({ message: "Please provide comment text" });
    }
    const post = await postmodel.findById(postid);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = {
      user,
      text,
    };
    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getallposts = async (req, res) => {
  try {
    const posts = await postmodel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    if (posts.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getlikepost = async (req, res) => {
  try {
    const userid = req.user._id;
    if (!userid) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await usermodel.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const likedposts = await postmodel
      .find({ _id: { $in: user.likedpost } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    res.status(200).json(likedposts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getfollowingpost = async (req, res) => {
  try {
    const userid = req.user._id;
    if (!userid) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await usermodel.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const following = user.following;
    const followingpost = await postmodel
      .find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    res.status(200).json(followingpost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getuserpost = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await usermodel.findOne(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await postmodel
      .find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getuserpost,
  getfollowingpost,
  createpost,
  likeunlikepost,
  deleteost,
  commentinpost,
  getallposts,
  getlikepost,
};
