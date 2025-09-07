const { Router } = require("express");
const {
  AddAuthor_social,
  DeleteAuthor_social,
  GetAllAuthor_socials,
  PatchAuthor_social,
} = require("../controllers/author_social.controller.js");
const selfGuard = require("../middlewares/guards/self.guard.js");
const authGuard = require("../middlewares/guards/auth.guard.js");

const router = Router();

router.post("/", AddAuthor_social);
router.get("/", GetAllAuthor_socials);
router.get("/:id", authGuard, selfGuard, GetAllAuthor_socials);
router.patch("/:id", PatchAuthor_social);
router.delete("/:id", DeleteAuthor_social);

module.exports = router;
