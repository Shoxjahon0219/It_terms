const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const Author = sequelize.define("author", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  nick_name: {
    type: DataTypes.STRING(20),
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING(20),
  },
  password: {
    type: DataTypes.STRING,
  },
  info: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
  is_expert: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
  },
});
module.exports = {
  Author,
};
