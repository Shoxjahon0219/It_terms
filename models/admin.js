const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const Admin = sequelize.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
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
    is_creator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    freezeTableName:true
  }
);
module.exports = {
  Admin,
};
