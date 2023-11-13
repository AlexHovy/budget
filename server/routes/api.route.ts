import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const verifyToken = AuthMiddleware.verifyToken;

router.get("/category/", verifyToken, CategoryController.get);
router.get("/category/:id", verifyToken, CategoryController.getById);
router.post("/category/", verifyToken, CategoryController.post);
router.put("/category/:id", verifyToken, CategoryController.put);
router.delete("/category/:id", verifyToken, CategoryController.remove);

export default router;
