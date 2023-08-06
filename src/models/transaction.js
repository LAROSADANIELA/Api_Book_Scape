const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

/* 
Este modelo debe definirse dacuerdo a los datos de 
la respuesta del medio de pago https://www.mercadopago.com.ar/developers/es/docs/checkout-api/landing
*/
  
  sequelize.define("Transaction", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
};
