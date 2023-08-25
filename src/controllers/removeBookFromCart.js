// Eliminar
// {
//     id: shopingCart
//     id: libro
//     {
//         menssaje. "se eliminado"
//         valor: false;
//     }
// }

//DETAIL un detalle tiene un solo book y book beongs to detail
// Martín cuando puedas me gustaría ver lo de pasar
// el shoping cart a la base de datos, solo necesitaría
// saber que estructura de datos me enviarías por body.
// Entiendo que es ID de usuario IDs de books nada más, y
// con eso estaríamos. Devolvería un objeto con un
// message: ShopingCart creado y otra propiedad ID del shopingCart.
// Los demás controllers de shoppingCart vendrían después,
// agregar, eliminar, si fuese necesario algún otro también.
// Si necesitas algún controlador para pasar esos datos avísanos.
// Voy trabajando en esta estructura que te pase.

//Crear {
//     ID usuario, Id Libros
// }

// Checkbox si se quiere comprar.

//getBooksCart{
//     ID CARRITO

//         BOOKS [
//             {

//             }
//         ] datos libros
//             titlo
//             imagen
//             autor
//             precio

const {
    ShoppingCart,
  } = require("../db");
  
  const removebookCart = async (req, res, next) => {
    // console.log("Funcnion getBooksCart");
    try {
      const { id_cart, id_book } = req.body;
      // console.log("id",id)
      const cart = await ShoppingCart.findByPk(id_cart, {
        attributes: ["cart_id","UserId"],
      });
      cart.removeBook(id_book);
      res.send({
        message: "Se elimino el libro del carrito",
        valor: true,
        id_book: id_book,
        cart: cart,
      });
    } catch (error) {
      next(error);
    }
  };
  module.exports = removebookCart;
  