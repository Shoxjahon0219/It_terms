const { Router } = require("express");
const {
  AddCategory,
  DeleteCategory,
  GetAllCategorys,
  GetOneCategory,
  PatchCategory,
} = require("../controllers/category.controller.js");

const router = Router();

router.post("/", AddCategory);
router.get("/", GetAllCategorys);
router.get("/:id", GetOneCategory);
router.patch("/:id", PatchCategory);
router.delete("/:id", DeleteCategory);

module.exports = router;
