const { Router } = require("express");
const authorRouter = require("./author.routes.js");
const socialRouter = require("./social.routes.js");
const author_socialRouter = require("./author_social.routes.js");
const topicRouter = require("./topic.routes.js");
const dictionaryRouter = require("./dictionary.routes.js");
const categoryRouter = require("./category.routes.js");
const descriptionRouter = require("./description.routes.js");
const synonymRouter = require("./synonym.routes.js");
const authRouter = require("./auth.routes.js");
const adminRouter = require("./admin.route.js");
const userRouter = require("./user.route.js");

const router = Router();

router.use("/author", authorRouter);
router.use("/auth", authRouter);
router.use("/social", socialRouter);
router.use("/author_social", author_socialRouter);
router.use("/topic", topicRouter);
router.use("/dictionary", dictionaryRouter);
router.use("/category", categoryRouter);
router.use("/description", descriptionRouter);
router.use("/synonym", synonymRouter);
router.use("/user", userRouter);

router.use("/admin", adminRouter);

module.exports = router;
