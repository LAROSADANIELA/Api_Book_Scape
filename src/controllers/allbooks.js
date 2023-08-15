const {Book, Language, Author} = require("../db")



//titulo imagen rating author precio CARD
const allBooks = async (req, res, next) => {
    try {
        
        const allBooksDB = await Book.findAll({
            attributes: ['title','price','rating_ave','image'],
            include: Author /*{
                model: Language,
                attributes:['language']
            }*/
        })
        res.send(allBooksDB)
    } catch (error) {
        next(error)
    }
}

module.exports= allBooks
