import { CategoryController } from "../controllers/category.controller";
import { ExpenseController } from "../controllers/expense.controller";
import { UserController } from "../controllers/user.controller";
import Category from "../models/category.model";
import Expense from "../models/expense.model";
import User from "../models/user.model";
import { CategoryQuery } from "../queries/category.query";
import { ExpenseQuery } from "../queries/expense.query";
import { UserQuery } from "../queries/user.query";
import { CategoryService } from "../services/category.service";
import { ExpenseService } from "../services/expense.service";
import { RepositoryService } from "../services/repository.service";
import { UserService } from "../services/user.service";

// Repositories
export const userRepository = new RepositoryService(User);
export const categoryRepository = new RepositoryService(Category);
export const expenseRepository = new RepositoryService(Expense);

// Queries
export const userQuery = new UserQuery(userRepository);
export const categoryQuery = new CategoryQuery(categoryRepository);
export const expenseQuery = new ExpenseQuery(expenseRepository);

// Services
export const userService = new UserService(userRepository);
export const categoryService = new CategoryService(categoryRepository);
export const expenseService = new ExpenseService(expenseRepository);

// Controllers
export const userController = new UserController();
export const categoryController = new CategoryController();
export const expenseController = new ExpenseController();
