const { sendErrorResponse } = require("../../helpers/send.error.response");

module.exports = () => {
  return (req, res, next) => {
    try {
      if (!req.admin.is_creator) {
        return sendErrorResponse(
          {
            message: `Faqat creator Admin ga korish mumkun`,
          },
          res,
          403
        );
      }
      next();
    } catch (error) {
      sendErrorResponse(error, res, 403);
    }
  };
};
