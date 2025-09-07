const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

Category.belongsTo(Category, {
  foreignKey: "parent_categoryId",
  as: "parent",
});
Category.hasMany(Category, {
  foreignKey: "parent_categoryId",
  as: "children",
});

module.exports = {
  Category,
};
