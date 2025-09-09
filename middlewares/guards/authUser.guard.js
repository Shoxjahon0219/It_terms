const { sendErrorResponse } = require("../../helpers/sendErrorResponse.js");
const jwtService = require("../../services/jwt.service.js");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return sendErrorResponse(
        { message: "Auth header is not found" },
        res,
        401
      );
    }
    const token = authHeader.split(" ")[1];
    const Bearer = authHeader.split(" ")[0];
    if (Bearer != "Bearer" || !token) {
      return sendErrorResponse({ message: "Token not found" }, res, 401);
    }

    const verifyAccessToken = await jwtService.verifyAccessToken(token);
    req.user = verifyAccessToken;
    next();
  } catch (error) {
    sendErrorResponse(error, res, 403);
  }
};
