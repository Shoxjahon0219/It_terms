const { Router } = require("express");
const {
  AddAdmin,
  DeleteAdmin,
  GetAllAdmins,
  GetOneAdmin,
  PatchAdmin,
} = require("../controllers/admin.controller.js");
const authGuard = require("../middlewares/guards/auth.guard.js");
const selfGuard = require("../middlewares/guards/self.guard.js");
// const creatorguard = require("../middlewares/guards/creator.guard.js"); Birinchi SupperAdmin dan keen qoshiladi

const router = Router();

router.post("/", AddAdmin);
router.get("/", GetAllAdmins);
router.get("/:id", authGuard, selfGuard, GetOneAdmin);
router.patch("/:id", authGuard, selfGuard, PatchAdmin);
router.delete("/:id", authGuard, selfGuard, DeleteAdmin);

module.exports = router;
