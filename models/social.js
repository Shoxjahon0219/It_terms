const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const Social = sequelize.define("social", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  icon: {
    type: DataTypes.STRING,
  },
});

module.exports = {
  Social,
};
