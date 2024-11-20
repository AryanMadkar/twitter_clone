const notificarionmodel = require("../model/notificationmodel");

const getnotification = async (req, res) => {
  try {
    const userid = req.user._id;
    if (!userid) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const notifications = await notificarionmodel
      .find({ user: userid })
      .sort({ createdAt: -1 })
      .populate({
        path: "from",
        select: "username image",
      });
    await notificarionmodel.updateMany({ to: userid }, { read: true });
    res.json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const delnotification = async (req, res) => {
  try {
    const userid = req.user._id;
    await notificarionmodel.deleteMany({ to: userid });
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getnotification,
  delnotification,
};
