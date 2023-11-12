const auth = require("../middlewares/auth");
const { Router } = require("express");
const router = Router();

const category = require("../controllers/category");
router.get("/category/", auth, category.get);
router.get("/category/:id", auth, category.getById);
router.post("/category/", auth, category.post);
router.put("/category/:id", auth, category.put);
router.delete("/category/:id", auth, category.remove);

module.exports = router;
