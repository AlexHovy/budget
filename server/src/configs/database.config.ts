import mongoose from "mongoose";
import { InternalServerError } from "../utils/error.util";
import { settingsService } from "./dependency.config";

export class DatabaseConfig {
  async connect() {
    try {
      const dbUri = await settingsService.getDbUri();
      const dbName = await settingsService.getDbName();

      const dbOptions = {
        dbName: dbName,
      };

      await mongoose.connect(dbUri, dbOptions);
      console.log("MongoDB connected successfully");
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
