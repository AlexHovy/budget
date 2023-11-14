import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import userRoutes from "./routes/user.route";
import apiRoutes from "./routes/api.route";
import { DatabaseService } from "./services/database.service";
import { SettingsConfig } from "./configs/settings.config";
import { errorMiddleware } from "./middlewares/error.middleware";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DatabaseService.connect();

// Routes
app.use("/user", userRoutes);
app.use("/api", apiRoutes);

// Middlewares
app.use(errorMiddleware);

const port = SettingsConfig.getPort() ?? 3000;
app.listen(port, (err?: Error) => {
  if (err) {
    console.error(`Server could not start: ${err.message}`);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
