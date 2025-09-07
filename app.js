const express = require("express");
const config = require("config");
const { sequelize } = require("./config/db.js");
const Index = require("./routes/index.js");
const cookieParser = require("cookie-parser");

const PORT = config.get("port") ?? 3333;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api", Index);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`server is on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
