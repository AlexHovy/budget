import mongoose from "mongoose";
import { SettingsConfig } from "../configs/settings.config";

export class DatabaseService {
  static async connect(): Promise<void> {
    try {
      const dbUri = SettingsConfig.getDbUri();
      const dbName = SettingsConfig.getDbName();

      const dbOptions = {
        dbName: dbName,
      };

      await mongoose.connect(dbUri, dbOptions);
      console.log("MongoDB connected successfully");
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred during MongoDB connection");
      }
      process.exit(1);
    }
  }
}
