const { Router } = require("express");
const { AddSocial, DeleteSocial, GetAllSocials, GetOneSocial, PatchSocial } = require("../controllers/social.controller.js");

const router = Router();

router.post("/", AddSocial);
router.get("/", GetAllSocials);
router.get("/:id", GetOneSocial);
router.patch("/:id", PatchSocial);
router.delete("/:id", DeleteSocial);

module.exports = router;