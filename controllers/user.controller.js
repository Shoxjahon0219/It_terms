const { User } = require("../models/user.js");
const bcrypt = require("bcrypt");
const config = require("config");

const jwtService = require("../services/jwt.service.js");
const { sendErrorResponse } = require("../helpers/sendErrorResponse.js");

const GetAllUsers = async (req, res) => {
  try {
    const Users = await User.findAll();

    res.status(200).send({
      message: "All Users",
      data: Users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Users" });
  }
};

const GetOneUser = async (req, res) => {
  try {
    let { id } = req.params;
    const Users = await User.findByPk(id);

    res.status(200).send({
      message: "User",
      data: Users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting User" });
  }
};

const PatchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await User.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such User doesn't exists" });
    }
    const fUser = await User.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "User is updated",
      data: fUser[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating User" });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await User.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such User doesn't exists" });
    }
    const fUser = await User.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "User is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted User" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, phone_number, password, info } = req.body;
    const check = await User.findOne({ where: { email } });
    if (check) {
      return res.status(403).send({ message: "Such User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const NewUser = await User.create({
      name,
      email,
      phone_number,
      password: hashedPassword,
      info,
    });
    res.status(201).send({
      message: "New User is added",
      data: NewUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding User" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return sendErrorResponse(
        { message: "Email yoki password noto'gri" },
        res,
        401
      );
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Email yoki password noto'gri" },
        res,
        401
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
    };
    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    user.refreshToken = hashedRefreshToken;
    await user.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });
    res.status(200).send({
      message: "user logged in",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error login User" });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse({ message: "No token in cookie" }, res, 400);
    }
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    const admin = await User.findByPk(verifiedRefreshToken.id);
    admin.refreshToken = null;
    await admin.save();

    res.clearCookie("refreshToken");
    res.send({
      message: "admin logged out",
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  GetAllUsers,
  GetOneUser,
  register,
  PatchUser,
  DeleteUser,
  login,
  register,
  logout,
};
