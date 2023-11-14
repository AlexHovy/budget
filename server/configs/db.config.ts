import mongoose from "mongoose";
import { SettingsConfig } from "./settings.config";
import { InternalServerError } from "../utils/error.util";

export const connectDatabase = async () => {
  try {
    const dbUri = SettingsConfig.getDbUri();
    const dbName = SettingsConfig.getDbName();

    const dbOptions = {
      dbName: dbName,
    };

    await mongoose.connect(dbUri, dbOptions);
    console.log("MongoDB connected successfully");
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new InternalServerError(errorMessage);
  }
};
