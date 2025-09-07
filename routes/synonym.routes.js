const { Router } = require("express");
const { AddSynonym, DeleteSynonym, GetAllSynonyms, GetOneSynonym, PatchSynonym } = require("../controllers/synonym.controller.js");

const router = Router();

router.post("/", AddSynonym);
router.get("/", GetAllSynonyms);
router.get("/:id", GetOneSynonym);
router.patch("/:id", PatchSynonym);
router.delete("/:id", DeleteSynonym);

module.exports = router;