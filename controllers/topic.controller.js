const { Topic } = require("../models/topic.js");

const GetAllTopics = async (req, res) => {
  try {
    const Topics = await Topic.findAll();

    res.status(200).send({
      message: "All Topics",
      data: Topics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Topics" });
  }
};

const GetOneTopic = async (req, res) => {
  try {
    let { id } = req.params;
    const Topics = await Topic.findByPk(id);

    res.status(200).send({
      message: "Topic",
      data: Topics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Topic" });
  }
};

const AddTopic = async (req, res) => {
  try {
    const { title, text, is_checked, is_approved, authorId } = req.body;
    const check = await Topic.findOne({ where: { title } });
    if (check) {
      return res.status(403).send({ message: "Such Topic already exists" });
    }
    const NewTopic = await Topic.create({
      title,
      text,
      is_checked,
      is_approved,
      authorId,
    });
    res.status(201).send({
      message: "New Topic is added",
      data: NewTopic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Topic" });
  }
};

const PatchTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Topic.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Topic doesn't exists" });
    }
    const fTopic = await Topic.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Topic is updated",
      data: fTopic[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Topic" });
  }
};

const DeleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Topic.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Topic doesn't exists" });
    }
    const fTopic = await Topic.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Topic is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Topic" });
  }
};

module.exports = {
  GetAllTopics,
  GetOneTopic,
  AddTopic,
  PatchTopic,
  DeleteTopic,
};
