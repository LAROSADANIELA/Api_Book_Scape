const {Book, Languaje} = require("../db")


// titulo- authors -descripcion-tag- precio-rating-imagen- DETAILS

//

//titulo imagen rating author precio CARD
const allBook = async () => {
    return await Book.findAll({
        attributes: ['title','price','rating_ave','image'],
        include: {
            model: Languaje,
            attributes:['language']
        }
    })
}

module.exports= allBook
