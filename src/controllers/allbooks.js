const {Book, Language, Author} = require("../db")



//titulo imagen rating author precio CARD
const allBooks = async () => {
    return await Book.findAll({
        attributes: ['title','price','rating_ave','image'],
        include: {
            model: Language,
            attributes:['language']
        }
    })
}

module.exports= allBooks
