const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ShoppingCart", {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    /*user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "User", // Nombre de la tabla de usuarios (User)
        key: "id", // Columna referenciada en la tabla de usuarios
      },
    },
    book_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "Book", // Nombre de la tabla de libros (Book)
        key: "id_book", // Columna referenciada en la tabla de libros
      },
    },*/
    orders_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
    },
  });
};
