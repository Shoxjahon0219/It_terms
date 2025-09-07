const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");
const { Category } = require("./category.js");

const Description = sequelize.define("description", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Description.belongsTo(Category);
Category.hasMany(Description);

module.exports = {
  Description,
};
