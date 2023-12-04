import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

import cors from "cors";
import express, { Application } from "express";
import apiRoutes from "./src/routes/api.route";
import {
  databaseConfig,
  errorMiddleware,
  firebaseConfig,
} from "./src/configs/dependency.config";

const app: Application = express();

// Middlewares
app.use(errorMiddleware.handle);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", apiRoutes);

// Connections
databaseConfig.connect();
firebaseConfig.connect();

const port = 8080;
app.listen(port, (err?: Error) => {
  if (err) {
    console.error(`Server could not start: ${err.message}`);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
