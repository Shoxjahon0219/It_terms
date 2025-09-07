const { Router } = require("express");
const {
  AddDescription,
  DeleteDescription,
  GetAllDescriptions,
  GetOneDescription,
  PatchDescription,
} = require("../controllers/description.controller.js");

const router = Router();

router.post("/", AddDescription);
router.get("/", GetAllDescriptions);
router.get("/:id", GetOneDescription);
router.patch("/:id", PatchDescription);
router.delete("/:id", DeleteDescription);

module.exports = router;
