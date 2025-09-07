const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");
const { Author } = require("./Author.js");

const Topic = sequelize.define("topic", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  is_checked: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Topic.hasOne(Author);
Author.hasMany(Topic);

module.exports = {
  Topic,
};
