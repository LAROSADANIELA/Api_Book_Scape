require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/bookStore`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
console.log(sequelize.models);
const {
  Book,
  Categorie,
  Publisher,
  Lenguage,
  Review,
  User,
  Pay,
  Favorite,
  ShoppingCart,
  Order,
} = sequelize.models;

// Aca vendrian las relaciones

/// RELACION TABLA BOOKS A CATEGORIES ///
Book.hasOne(Categorie);
Categorie.hasMany(Book);
/// RELACION TABLA BOOKS A PUBLISHER ///
Book.hasOne(Publisher);
Publisher.hasMany(Book);
/// RELACION TALBA BOOKS A FAVORITES ///
Book.hasOne(Favorite);
Favorite.hasOne(Book);
/// RELACION TABLA BOOKS A LENGUAGES ///
Book.hasOne(Lenguage);
Lenguage.hasMany(Book);
/// RELACION TABLA BOOKS A REVIEWS ///
Book.hasMany(Review);
Review.hasOne(Book);
/// RELACION TABLA BOOKS A SHOPING_CART ///
Book.belongsToMany(ShoppingCart, {
  through: "shopingCart_book",
  timestamps: true,
});
ShoppingCart.belongsToMany(Book, {
  through: "shopingCart_book",
  timestamps: true,
});
/// RELACION TABLA USERS A FAVORITES ///
User.belongsToMany(Favorite, { through: "fav_user", timestamps: true });
Favorite.belongsToMany(User, { through: "fav_user", timestamps: true });
/// RELACION TABLA USERS A PAY ///
User.hasMany(Pay);
Pay.hasOne(User);
/// RELACION TABLA USERS A ORDERS ///
User.hasMany(Order);
Order.hasOne(Order);
/// RELACION TABLA USERS A SHOPING_CART ///
User.hasOne(ShoppingCart);
ShoppingCart.hasMany(User);
/// RELACION TABLA USER REVIEW ///
User.hasMany(Review);
Review.hasOne(User)
/////////////////////////////////////////////////////////////////////

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
