const { Author_social } = require("../models/author_social.js");
const { Social } = require("../models/social.js");

const GetAllAuthor_socials = async (req, res) => {
  try {
    const Author_socials = await Author_social.findAll({ include: Social });

    res.status(200).send({
      message: "All Author_socials",
      data: Author_socials,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Author_socials" });
  }
};

const GetOneAuthor_social = async (req, res) => {
  try {
    let { id } = req.params;
    const Author_socials = await Author_social.findByPk(id);

    res.status(200).send({
      message: "Author_social",
      data: Author_socials,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Author_social" });
  }
};

const AddAuthor_social = async (req, res) => {
  try {
    const { social_link, socialId, authorId } = req.body;
    const check = await Author_social.findOne({ where: { social_link } });
    if (check) {
      return res
        .status(403)
        .send({ message: "Such Author_social already exists" });
    }
    const NewAuthor_social = await Author_social.create({
      social_link,
      socialId,
      authorId,
    });
    res.status(201).send({
      message: "New Author_social is added",
      data: NewAuthor_social,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Author_social" });
  }
};

const PatchAuthor_social = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Author_social.findOne({ where: { id } });
    if (!check) {
      return res
        .status(403)
        .send({ message: "Such Author_social doesn't exists" });
    }
    const author_social = await Author_social.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Author_social is updated",
      data: author_social[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Author_social" });
  }
};

const DeleteAuthor_social = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Author_social.findOne({ where: { id } });
    if (!check) {
      return res
        .status(403)
        .send({ message: "Such Author_social doesn't exists" });
    }
    await Author_social.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Author_social is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Author_social" });
  }
};

module.exports = {
  GetAllAuthor_socials,
  GetOneAuthor_social,
  AddAuthor_social,
  PatchAuthor_social,
  DeleteAuthor_social,
};
