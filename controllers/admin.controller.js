const { Admin } = require("../models/admin.js");
const bcrypt = require("bcrypt");

const GetAllAdmins = async (req, res) => {
  try {
    const Admins = await Admin.findAll();

    res.status(200).send({
      message: "All Admins",
      data: Admins,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Admins" });
  }
};

const GetOneAdmin = async (req, res) => {
  try {
    let { id } = req.params;
    const Admins = await Admin.findByPk(id);

    res.status(200).send({
      message: "Admin",
      data: Admins,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Admin" });
  }
};

const AddAdmin = async (req, res) => {
  try {
    const { name, email, phone_number, password, is_creator } = req.body;
    const check = await Admin.findOne({ where: { email } });
    if (check) {
      return res.status(403).send({ message: "Such Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const NewAdmin = await Admin.create({
      name,
      email,
      phone_number,
      password: hashedPassword,
      is_creator,
    });
    res.status(201).send({
      message: "New Admin is added",
      data: NewAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Admin" });
  }
};

const PatchAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Admin.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Admin doesn't exists" });
    }
    const fAdmin = await Admin.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Admin is updated",
      data: fAdmin[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Admin" });
  }
};

const DeleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Admin.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Admin doesn't exists" });
    }
    const fAdmin = await Admin.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Admin is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Admin" });
  }
};

module.exports = {
  GetAllAdmins,
  GetOneAdmin,
  AddAdmin,
  PatchAdmin,
  DeleteAdmin,
};
