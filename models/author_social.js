const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");
const { Author } = require("./Author.js");
const { Social } = require("./social.js");

const Author_social = sequelize.define("author_social", {
  social_link: {
    type: DataTypes.STRING,
    unique: true,
  },
});
Author.belongsToMany(Social, { through: Author_social });
Social.belongsToMany(Author, { through: Author_social });

Author_social.belongsTo(Author);
Author_social.belongsTo(Social);

module.exports = {
  Author_social,
};
