import { Router } from "express";
import { categoryController } from "../configs/di.config";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/category/", verifyToken, categoryController.get);
router.get("/category/:id", verifyToken, categoryController.getById);
router.post("/category/", verifyToken, categoryController.post);
router.put("/category/:id", verifyToken, categoryController.put);
router.delete("/category/:id", verifyToken, categoryController.remove);

export default router;
