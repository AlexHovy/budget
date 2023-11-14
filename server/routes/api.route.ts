import { Router } from "express";
import { categoryController, expenseController } from "../configs/di.config";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/category/", verifyToken, categoryController.get);
router.get("/category/:id", verifyToken, categoryController.getById);
router.post("/category/", verifyToken, categoryController.post);
router.put("/category/:id", verifyToken, categoryController.put);
router.delete("/category/:id", verifyToken, categoryController.remove);

router.get("/expense/", verifyToken, expenseController.get);
router.get("/expense/:id", verifyToken, expenseController.getById);
router.post("/expense/", verifyToken, expenseController.post);
router.put("/expense/:id", verifyToken, expenseController.put);
router.delete("/expense/:id", verifyToken, expenseController.remove);

export default router;
