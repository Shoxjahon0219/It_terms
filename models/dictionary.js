const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const Dictionary = sequelize.define("dictionary", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  term: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  letter: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

module.exports = {
  Dictionary,
};
