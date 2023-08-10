const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Review", {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Nombre de la tabla de usuarios (User)
        key: "user_id", // Columna referenciada en la tabla de usuarios
      },
    },
    book_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      references: {
        model: "Books", // Nombre de la tabla de libros (Book)
        key: "book_id", // Columna referenciada en la tabla de libros
      },
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
