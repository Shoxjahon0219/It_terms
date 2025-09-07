const { sendErrorResponse } = require("../../helpers/sendErrorResponse.js");

module.exports = async (req, res, next) => {
  try {
    if (req.params.id != req.admin.id) {
      return sendErrorResponse(
        { message: "Only personal info is allowed" },
        res,
        401
      );
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res, 403);
  }
};
