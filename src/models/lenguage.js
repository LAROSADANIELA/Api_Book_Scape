const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Lenguage", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
