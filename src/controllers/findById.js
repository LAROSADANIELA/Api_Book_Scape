const {Book, Languaje , Author , Publisher, Review, Tag } = require("../db")
// titulo- authors -descripcion-tag- precio-rating-imagen- DETAILS

const findById = async (id) => {
    // recivimos un ID de libro
    // buscamos en la tabla Book el id (titulo, descripcion,precio,rating,imagen)
    // Los autores estan en la tabla intermedia
    // los tags estane en una tabla intermedia
   return await Book.findAll({
    where: {id_book: id},
    attributes: [
        'title',
        'price',
        'rating',
        'description',
        'image'],
        include:[
        {
            model: Publisher,
            attributes: name,
        },
        {
            model: Languaje,
            attributes: description
        },
        {
            model:Review,
            attributes: review_text
        },
        /*{
            model: Author,
            attributes: name
        },
        {
            model: Tag,
            attributes: name
        }*/
        ]   
    } 
   )
}
module.exports = findById