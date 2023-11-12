import mongoose from "mongoose";

const { MONGO_URI, DB_NAME } = process.env;

mongoose.pluralize(null);

const connectDB = async (): Promise<void> => {
  try {
    const dbOptions = {
      dbName: DB_NAME as string,
    };

    await mongoose.connect(MONGO_URI as string, dbOptions);
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