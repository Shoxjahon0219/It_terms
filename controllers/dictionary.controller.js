const { Description } = require("../models/description.js");
const { Dictionary } = require("../models/dictionary.js");

const GetAllDictionarys = async (req, res) => {
  try {
    const Dictionarys = await Dictionary.findAll({ include: Description });

    res.status(200).send({
      message: "All Dictionarys",
      data: Dictionarys,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Dictionarys" });
  }
};

const GetOneDictionary = async (req, res) => {
  try {
    let { id } = req.params;
    const Dictionarys = await Dictionary.findByPk(id);

    res.status(200).send({
      message: "Dictionary",
      data: Dictionarys,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Dictionary" });
  }
};

const AddDictionary = async (req, res) => {
  try {
    const { term, letter } = req.body;
    const check = await Dictionary.findOne({ where: { term } });
    if (check) {
      return res
        .status(403)
        .send({ message: "Such Dictionary already exists" });
    }
    const NewDictionary = await Dictionary.create({
      term,
      letter,
    });
    res.status(201).send({
      message: "New Dictionary is added",
      data: NewDictionary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Dictionary" });
  }
};

const PatchDictionary = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Dictionary.findOne({ where: { id } });
    if (!check) {
      return res
        .status(403)
        .send({ message: "Such Dictionary doesn't exists" });
    }
    const fDictionary = await Dictionary.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Dictionary is updated",
      data: fDictionary[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Dictionary" });
  }
};

const DeleteDictionary = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Dictionary.findOne({ where: { id } });
    if (!check) {
      return res
        .status(403)
        .send({ message: "Such Dictionary doesn't exists" });
    }
    const fDictionary = await Dictionary.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Dictionary is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Dictionary" });
  }
};

module.exports = {
  GetAllDictionarys,
  GetOneDictionary,
  AddDictionary,
  PatchDictionary,
  DeleteDictionary,
};
