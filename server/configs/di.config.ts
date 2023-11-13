import { CategoryController } from "../controllers/category.controller";
import { UserController } from "../controllers/user.controller";
import Category from "../models/category.model";
import User from "../models/user.model";
import { CategoryQuery } from "../queries/category.query";
import { UserQuery } from "../queries/user.query";
import { CategoryService } from "../services/category.service";
import { RepositoryService } from "../services/repository.service";
import { UserService } from "../services/user.service";

// Repositories
export const userRepository = new RepositoryService(User);
export const categoryRepository = new RepositoryService(Category);

// Queries
export const userQuery = new UserQuery(userRepository);
export const categoryQuery = new CategoryQuery(categoryRepository);

// Services
export const userService = new UserService(userRepository);
export const categoryService = new CategoryService(categoryRepository);

// Controllers
export const userController = new UserController();
export const categoryController = new CategoryController();
