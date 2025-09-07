const { Description } = require("../models/description.js");
const { Dictionary } = require("../models/dictionary.js");
const { Synonym } = require("../models/synonym.js");

const GetAllSynonyms = async (req, res) => {
  try {
    const Synonyms = await Synonym.findAll({
      include: [{ model: Description }, { model: Dictionary }],
    });

    res.status(200).send({
      message: "All Synonyms",
      data: Synonyms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Synonyms" });
  }
};

const GetOneSynonym = async (req, res) => {
  try {
    let { id } = req.params;
    const Synonyms = await Synonym.findByPk(id);

    res.status(200).send({
      message: "Synonym",
      data: Synonyms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Synonym" });
  }
};

const AddSynonym = async (req, res) => {
  try {
    const { descriptionId, dictionaryId } = req.body;
    const NewSynonym = await Synonym.create({
      descriptionId,
      dictionaryId,
    });
    res.status(201).send({
      message: "New Synonym is added",
      data: NewSynonym,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Synonym" });
  }
};

const PatchSynonym = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Synonym.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Synonym doesn't exists" });
    }
    const fSynonym = await Synonym.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Synonym is updated",
      data: fSynonym[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Synonym" });
  }
};

const DeleteSynonym = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Synonym.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Synonym doesn't exists" });
    }
    const fSynonym = await Synonym.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Synonym is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Synonym" });
  }
};

module.exports = {
  GetAllSynonyms,
  GetOneSynonym,
  AddSynonym,
  PatchSynonym,
  DeleteSynonym,
};
