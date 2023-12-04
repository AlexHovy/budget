import { CategoryController } from "../controllers/category.controller";
import { TransactionController } from "../controllers/transaction.controller";
import Category from "../models/category.model";
import Transaction from "../models/transaction.model";
import { CategoryQuery } from "../queries/category.query";
import { TransactionQuery } from "../queries/transaction.query";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { RepositoryService } from "../services/repository.service";
import { Queue } from "../utils/queue.util";
import { LogService } from "../services/log.service";
import { CacheService } from "../services/cache.service";
import { ErrorMiddleware } from "../middlewares/error.middleware";
import { DatabaseConfig } from "./database.config";
import { FirebaseConfig } from "./firebase.config";
import { AWSParameterStoreService } from "../services/aws-parameter-store.service";
import { SettingsService } from "../services/settings.service";
import { FileHelper } from "../helpers/file.helper";
import { HealthController } from "../controllers/health.controller";

export const parameterStore = new AWSParameterStoreService();
export const settingsService = new SettingsService();

// Core
export const queue = new Queue();

// Config
export const databaseConfig = new DatabaseConfig();
export const firebaseConfig = new FirebaseConfig();

// Middlewares
export const errorMiddleware = new ErrorMiddleware();

// Repositories
export const categoryRepository = new RepositoryService(Category);
export const transactionRepository = new RepositoryService(Transaction);

// Queries
export const categoryQuery = new CategoryQuery(categoryRepository);
export const transactionQuery = new TransactionQuery(transactionRepository);

// Services
export const cahceService = new CacheService();
export const logService = new LogService();
export const categoryService = new CategoryService(categoryRepository);
export const transactionService = new TransactionService(transactionRepository);

// Helpers
export const fileHelper = new FileHelper();

// Controllers
export const healthController = new HealthController();
export const categoryController = new CategoryController();
export const transactionController = new TransactionController();
