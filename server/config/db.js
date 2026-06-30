const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    await mongoose.connect(uri, { dbName: "blogapp" });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;