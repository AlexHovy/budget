import { CategoryController } from "../controllers/category.controller";
import { TransactionController } from "../controllers/transaction.controller";
import { UserController } from "../controllers/user.controller";
import Category from "../models/category.model";
import Transaction from "../models/transaction.model";
import User from "../models/user.model";
import { CategoryQuery } from "../queries/category.query";
import { TransactionQuery } from "../queries/transaction.query";
import { UserQuery } from "../queries/user.query";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { RepositoryService } from "../services/repository.service";
import { UserService } from "../services/user.service";
import { Queue } from "../utils/queue.util";
import { LogService } from "../services/log.service";
import { CacheService } from "../services/cache.service";

// Core
export const queue = new Queue();

// Repositories
export const userRepository = new RepositoryService(User);
export const categoryRepository = new RepositoryService(Category);
export const transactionRepository = new RepositoryService(Transaction);

// Queries
export const userQuery = new UserQuery(userRepository);
export const categoryQuery = new CategoryQuery(categoryRepository);
export const transactionQuery = new TransactionQuery(transactionRepository);

// Services
export const cahceService = new CacheService();
export const userService = new UserService(userRepository);
export const categoryService = new CategoryService(categoryRepository);
export const transactionService = new TransactionService(transactionRepository);
export const logService = new LogService();

// Controllers
export const userController = new UserController();
export const categoryController = new CategoryController();
export const transactionController = new TransactionController();
