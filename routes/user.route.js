const { Router } = require("express");
const {
  register,
  DeleteUser,
  GetAllUsers,
  GetOneUser,
  PatchUser,
  login,
  logout,
} = require("../controllers/user.controller.js");
const authGuard = require("../middlewares/guards/authUser.guard.js");
const authAdminGuard = require("../middlewares/guards/auth.guard.js");
const selfGuard = require("../middlewares/guards/selfUser.guard.js");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", authAdminGuard, GetAllUsers);
router.get("/:id", authGuard, selfGuard, GetOneUser);
router.patch("/:id", authGuard, selfGuard, PatchUser);
router.delete("/:id", authGuard, selfGuard, DeleteUser);

module.exports = router;
