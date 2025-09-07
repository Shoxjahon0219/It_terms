const { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");
const { Description } = require("./description.js");
const { Dictionary } = require("./dictionary.js");

const Synonym = sequelize.define("synonym", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Dictionary.belongsToMany(Description, { through: Synonym });
Description.belongsToMany(Dictionary, { through: Synonym });
Synonym.belongsTo(Dictionary);
Synonym.belongsTo(Description);

module.exports = {
  Synonym,
};
