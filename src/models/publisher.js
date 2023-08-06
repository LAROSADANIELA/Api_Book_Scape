const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Publisher", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
