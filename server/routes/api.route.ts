import { Router } from "express";
import auth from "../middlewares/auth.middleware";
import * as category from "../controllers/category.controller";

const router = Router();

router.get("/category/", auth, category.get);
router.get("/category/:id", auth, category.getById);
router.post("/category/", auth, category.post);
router.put("/category/:id", auth, category.put);
router.delete("/category/:id", auth, category.remove);

export default router;
