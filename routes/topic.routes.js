const { Router } = require("express");
const { AddTopic, DeleteTopic, GetAllTopics, GetOneTopic, PatchTopic } = require("../controllers/topic.controller.js");

const router = Router();

router.post("/", AddTopic);
router.get("/", GetAllTopics);
router.get("/:id", GetOneTopic);
router.patch("/:id", PatchTopic);
router.delete("/:id", DeleteTopic);

module.exports = router;