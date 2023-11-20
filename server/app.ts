import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { Application } from "express";
import apiRoutes from "./routes/api.route";
import { SettingsConfig } from "./configs/settings.config";
import {
  databaseConfig,
  errorMiddleware,
  firebaseConfig,
} from "./configs/dependency.config";

const app: Application = express();

// Middlewares
app.use(errorMiddleware.handle);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

// Connections
databaseConfig.connect();
firebaseConfig.connect();

const port = SettingsConfig.getPort();
app.listen(port, (err?: Error) => {
  if (err) {
    console.error(`Server could not start: ${err.message}`);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
