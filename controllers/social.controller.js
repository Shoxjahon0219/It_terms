const { Social } = require("../models/social.js");

const GetAllSocials = async (req, res) => {
  try {
    const Socials = await Social.findAll();

    res.status(200).send({
      message: "All Socials",
      data: Socials,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Socials" });
  }
};

const GetOneSocial = async (req, res) => {
  try {
    let { id } = req.params;
    const Socials = await Social.findByPk(id);

    res.status(200).send({
      message: "Social",
      data: Socials,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Social" });
  }
};

const AddSocial = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const check = await Social.findOne({ where: { name } });
    if (check) {
      return res.status(403).send({ message: "Such Social already exists" });
    }
    const NewSocial = await Social.create({
      name,
      icon,
    });
    res.status(201).send({
      message: "New Social is added",
      data: NewSocial,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Social" });
  }
};

const PatchSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Social.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Social doesn't exists" });
    }
    const fSocial = await Social.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Social is updated",
      data: fSocial[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Social" });
  }
};

const DeleteSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Social.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Social doesn't exists" });
    }
    const fSocial = await Social.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Social is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Social" });
  }
};

module.exports = {
  GetAllSocials,
  GetOneSocial,
  AddSocial,
  PatchSocial,
  DeleteSocial,
};
