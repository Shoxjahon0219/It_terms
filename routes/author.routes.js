const { Router } = require("express");
const {
  AddAuthor,
  DeleteAuthor,
  GetAllAuthors,
  GetOneAuthor,
  PatchAuthor,
} = require("../controllers/author.controller.js");
const authGuard = require("../middlewares/guards/auth.guard.js");
const selfGuard = require("../middlewares/guards/self.guard.js");

const router = Router();

router.post("/", AddAuthor);
router.get("/", GetAllAuthors);
router.get("/:id", authGuard, selfGuard, GetOneAuthor);
router.patch("/:id", authGuard, selfGuard, PatchAuthor);
router.delete("/:id", authGuard, selfGuard, DeleteAuthor);

module.exports = router;
