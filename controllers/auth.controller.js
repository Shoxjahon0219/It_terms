const bcrypt = require("bcrypt");
const { sendErrorResponse } = require("../helpers/sendErrorResponse.js");
const jwtService = require("../services/jwt.service.js");
const config = require("config");
const { Admin } = require("../models/admin.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email: email } });
    if (!admin) {
      return sendErrorResponse(
        { message: "Email yoki password noto'gri" },
        res,
        401
      );
    }
    const verifyPassword = await bcrypt.compare(password, admin.password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Email yoki password noto'gri" },
        res,
        401
      );
    }
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refreshToken = hashedRefreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "admin logged in",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.log(error);

    sendErrorResponse(error, res, 500);
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
    const admin = await Admin.findByPk(verifiedRefreshToken.id);
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
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse({ message: "No token in cookie" }, res, 400);
    }
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    const admin = await Admin.findByPk(verifiedRefreshToken.id);
    const compareRefreshToken = await bcrypt.compare(
      refreshToken,
      admin.refreshToken
    );

    if (!compareRefreshToken) {
      return sendErrorResponse(
        { message: "Refresh token is incorrect" },
        res,
        400
      );
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      role: "admin",
    };
    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refreshToken = hashedRefreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "admin logged in",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  login,
  logout,
  refreshAccessToken,
};
