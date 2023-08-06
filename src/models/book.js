const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Book", {
    /// id seria el codigo ISBN del libro ///
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /// un libro puede tener mas de un autor, es un array de strings //
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    /// algunos libros tiene fecha exacta de publicacion, otros tiene solo año ///
    // como string ///
    /// se carga LA BDD de manera que figure solo el año como INTEGER ///
    publishedDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    /// algunos libros de la API no tienen descripción ///
    description: {
      type: DataTypes.TEXT,
      defaultValue: "none", 
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
