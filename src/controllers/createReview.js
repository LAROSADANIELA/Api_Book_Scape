const { Review , Book, User } = require("../db");

const createReview = async (req,res,next)=>{
    try{
        const { userId, bookId, text } = req.body;
            if(userId && bookId && text){
                if(Book.findByPk(Number(bookId)) && User.findByPk(userId)){
                    const review = await Review.create(
                        {
                            review_text: text,
                            BookId: Number(bookId),
                            UserId: userId,
                        }
                    );
                }else{
                   return res.status(400).json({message:"Usuario o Libro inexistente"});
                }
                return res.status(201).json({message:"review agregada"});
            }else{
                return res.status(400).json({message:"Falta userId o bookId"});
            }
    }catch(error){
        next(error);
    }
};

module.exports = createReview;