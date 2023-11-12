const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const connectDB = async () => {
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
