const { Router } = require("express");
const {
  AddDictionary,
  DeleteDictionary,
  GetAllDictionarys,
  GetOneDictionary,
  PatchDictionary,
} = require("../controllers/dictionary.controller.js");

const router = Router();

router.post("/", AddDictionary);
router.get("/", GetAllDictionarys);
router.get("/:id", GetOneDictionary);
router.patch("/:id", PatchDictionary);
router.delete("/:id", DeleteDictionary);

module.exports = router;
