import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { categoryController } from "../configs/di.config";

const router = Router();

const verifyToken = AuthMiddleware.verifyToken;

router.get("/category/", verifyToken, categoryController.get);
router.get("/category/:id", verifyToken, categoryController.getById);
router.post("/category/", verifyToken, categoryController.post);
router.put("/category/:id", verifyToken, categoryController.put);
router.delete("/category/:id", verifyToken, categoryController.remove);

export default router;
