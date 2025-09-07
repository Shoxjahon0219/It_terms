const { Category } = require("../models/category.js");
const { Description } = require("../models/description.js");
const { Dictionary } = require("../models/dictionary.js");

const GetAllDescriptions = async (req, res) => {
  try {
    const Descriptions = await Description.findAll({
      include: [{ model: Category }, { model: Dictionary }],
    });

    res.status(200).send({
      message: "All Descriptions",
      data: Descriptions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Descriptions" });
  }
};

const GetOneDescription = async (req, res) => {
  try {
    let { id } = req.params;
    const Descriptions = await Description.findByPk(id);

    res.status(200).send({
      message: "Description",
      data: Descriptions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Description" });
  }
};

const AddDescription = async (req, res) => {
  try {
    const { description, categoryId } = req.body;
    const check = await Description.findOne({ where: { description } });
    if (check) {
      return res
        .status(403)
        .send({ message: "Such Description already exists" });
    }
    const NewDescription = await Description.create({
      description,
      categoryId,
    });
    res.status(201).send({
      message: "New Description is added",
      data: NewDescription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Description" });
  }
};

const PatchDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Description.findOne({ where: { id } });
    if (!check) {
      return res
        .status(403)
        .send({ message: "Such Description doesn't exists" });
    }
    const fDescription = await Description.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Description is updated",
      data: fDescription[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Description" });
  }
};

const DeleteDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Description.findOne({ where: { id } });
    if (!check) {
      return res
        .status(403)
        .send({ message: "Such Description doesn't exists" });
    }
    const fDescription = await Description.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Description is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Description" });
  }
};

module.exports = {
  GetAllDescriptions,
  GetOneDescription,
  AddDescription,
  PatchDescription,
  DeleteDescription,
};
