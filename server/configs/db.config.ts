import mongoose from "mongoose";

const { MONGO_URI } = process.env;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log("MongoDB connected successfully");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("An unknown error occurred during MongoDB connection");
    }
    process.exit(1);
  }
};

export default connectDB;
