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
const {Book, Categorie,Publisher,Lenguage,Comment,User,Transaction} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

///////////////// A REVISAR ///////////////////////
/// vi por amazon que un libro puede tener varias categorias

Book.belongsToMany(Categorie, {through: "book_categorie", timestamps: false});
Categorie.belongsToMany(Book, {through: "book_categorie", timestamps: false});
// un libro puede tener un solo publicador, ya si este se codifica cambia su codigo ISBN;
Publisher.hasMany(Book);
// un libro puede tener un idioma pero un idioma varios libros
Lenguage.hasMany(Book);
//comentarios un libro peude tener varios comentarios pero un comentario solo un libro
Book.hasMany(Comment);
//un User puede tenr varios comentarios pero cada comentario un user
User.hasMany(Comment);
// un user puede tener varias transacciones pero una transaccion un solo user
User.hasMany(Transaction);
// un libro puede estar en varias transacciones 

Book.belongsToMany(Transaction, {through: "book_tr", timestamps: true});
/// y una transaccion puede contener varios libros
Transaction.belongsToMany(Book, {through: "book_tr", timestamps: true});
///////////////// A REVISAR ///////////////////////





module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
