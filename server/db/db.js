const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    await mongoose
      .connect(
        process.env.mongo_url ||
          "mongodb+srv://Aryan:Aradhya%401234@cluster0.0rv7f.mongodb.net/"
      )
      .then(console.log("Connected to MongoDB successfully!"));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = dbconnect;