const { Author } = require("../models/Author.js");
const { Social } = require("../models/social.js");
const config = require("config");
const bcrypt = require("bcrypt");
const GetAllAuthors = async (req, res) => {
  try {
    const Authors = await Author.findAll({ include: Social });

    res.status(200).send({
      message: "All Authors",
      data: Authors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Authors" });
  }
};

const GetOneAuthor = async (req, res) => {
  try {
    let { id } = req.params;
    const Authors = await Author.findByPk(id);

    res.status(200).send({
      message: "Author",
      data: Authors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Author" });
  }
};

const AddAuthor = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      nick_name,
      email,
      phone_number,
      password,
      info,
      position,
      is_expert,
      is_active,
    } = req.body;
    const check = await Author.findOne({ where: { email } });
    if (check) {
      return res.status(403).send({ message: "Such Author already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const NewAuthor = await Author.create({
      first_name,
      last_name,
      nick_name,
      email,
      phone_number,
      password: hashedPassword,
      info,
      position,
      is_expert,
      is_active,
    });
    res.status(201).send({
      message: "New Author is added",
      data: NewAuthor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Author" });
  }
};

const PatchAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Author.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Author doesn't exists" });
    }
    const fAuthor = await Author.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Author is updated",
      data: fAuthor[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Author" });
  }
};

const DeleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Author.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Author doesn't exists" });
    }
    const fAuthor = await Author.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Author is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Author" });
  }
};

module.exports = {
  GetAllAuthors,
  GetOneAuthor,
  AddAuthor,
  PatchAuthor,
  DeleteAuthor,
};
