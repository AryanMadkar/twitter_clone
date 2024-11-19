const notificarionmodel = require("../model/notificationmodel");
const usermodel = require("../model/usermodel");
const bcryptjs = require("bcryptjs");
const v2 = require("cloudinary");

const getuserprofile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await usermodel.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getsuggestion = async (req, res) => {
  try {
    const userid = req.user._id;
    const usersfollowedbbybe = await usermodel
      .findById(userid)
      .select("followig");
    let users = await usermodel.aggregate([
      {
        $match: {
          _id: { $ne: userid },
        },
      },
      { $sample: { size: 10 } },
    ]);
    const filterusers = users.filter(
      (users) => !usersfollowedbbybe.following.includes(users.id)
    );
    const suggestedusers = filterusers.slice(0, 4);
    suggestedusers.forEach((user) => (user.password = null));
    res.json(suggestedusers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const followfollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const usertomodify = await usermodel.findById(id);
    const currentuser = await usermodel.findById(req.user._id);
    if (id === req.user._id.tostring()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }
    const isfollow = usertomodify.followers.includes(currentuser._id);
    if (isfollow) {
      await usermodel.findByIdAndUpdate(id, {
        $pull: { followers: currentuser._id },
      });
      await usermodel.findByIdAndUpdate(req.user._id, {
        $pull: { following: id },
      });

      res.json({ message: "Unfollowed Successfully" });
    } else {
      await usermodel.findByIdAndUpdate(id, {
        $push: { followers: request.user._id },
      });
      await usermodel.findByIdAndUpdate(req.user._id, {
        $push: { following: id },
      });
      const notification = new notificarionmodel({
        type: "follow",
        from: req.user._id,
        to: usertomodify._id,
      });
      await notification.save();
      res.json({ message: "Followed Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    let {
      fullname,
      username,
      email,
      password,
      newpassword,
      image,
      coverimage,
      bio,
      link,
    } = req.body;
    let userid = req.user._id;
    let user = usermodel.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if ((!newpassword && password) || (!password && newpassword)) {
      return res
        .status(400)
        .json({ message: "Passwords must be provided both passwords" });
    }
    if (newpassword && password && newpassword === password) {
      return res.status(400).json({ message: "Passwords must be different" });
    }
    if (password && newpassword) {
      let hashpassword = await bcryptjs.compare(password, user.password);
      if (!hashpassword) {
        return res.status(401).json({ message: "Invalid current password" });
      }
      if (newpassword.length < 8) {
        return res
          .status(400)
          .json({ message: "Password must be between 8 and 100 characters" });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashnewpassword = await bcryptjs.hash(newpassword, salt);
      user.password = hashnewpassword;
    }
    if (image) {
      if (user.image) {
        await v2.uploader.destroy(user.image.split("/").pop().split(".")[0]);
      }
      const response = await v2.uploader.upload(image);
      image = response.secure_url;
    }
    if (coverimage) {
      if (user.coverimage) {
        await v2.uploader.destroy(
          user.coverimage.split("/").pop().split(".")[0]
        );
      }
      const response = await v2.uploader.upload(coverimage);
      coverimage = response.secure_url;
    }
    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.email = email || user.email;
    user.image = image || user.image;
    user.coverimage = coverimage || user.coverimage;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    await user.save();
    user.password = null;
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getuserprofile, getsuggestion, followfollowers, update };
