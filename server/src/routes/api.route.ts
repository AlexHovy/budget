import { Router } from "express";
import { categoryController, transactionController } from "../configs/dependency.config";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/category/", verifyToken, categoryController.get);
router.get("/category/:id", verifyToken, categoryController.getById);
router.post("/category/", verifyToken, categoryController.post);
router.put("/category/:id", verifyToken, categoryController.put);
router.delete("/category/:id", verifyToken, categoryController.remove);

router.get("/transaction/", verifyToken, transactionController.get);
router.get("/transaction/:id", verifyToken, transactionController.getById);
router.post("/transaction/", verifyToken, transactionController.post);
router.put("/transaction/:id", verifyToken, transactionController.put);
router.delete("/transaction/:id", verifyToken, transactionController.remove);

export default router;
