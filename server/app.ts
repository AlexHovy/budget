import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import apiRoutes from "./routes/api.route";
import { SettingsConfig } from "./configs/settings.config";
import {
  databaseConfig,
  errorMiddleware,
  firebaseConfig,
} from "./configs/dependency.config";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

databaseConfig.connect();
firebaseConfig.connect();

// Routes
app.use("/api", apiRoutes);

// Middlewares
app.use(errorMiddleware.handle);

const port = SettingsConfig.getPort();
app.listen(port, (err?: Error) => {
  if (err) {
    console.error(`Server could not start: ${err.message}`);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
