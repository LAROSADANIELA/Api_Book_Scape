const { Book, Language, Author, Publisher } = require("../db");
const { Op } = require("sequelize");

//titulo imagen rating author precio CARD
const allBooks = async (req, res, next) => {
  try {
    const { target } = req.query;
    if (!target) {
      const allBooksDB = await Book.findAll({
        attributes: ["title", "price", "rating_ave", "image"],
        include: {
          model: Author,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.send(allBooksDB);
    }
    console.log("Busqueda Por Book");
    console.log("Buscando", target);
    const allBooksDB = await Book.findAll({
      attributes: [
        "id_book",
        "isbn",
        "title",
        "published_date",
        "price",
        "description",
        "rating_ave",
        "image",
        "page_count",
        "url",
      ],
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${target}%` } },
          /*{'$author_book.AuthorId$': {[Op.iLike]:`%${target}%`}},*/
        ],
      },
      include: [
        {
          model: Author,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Language,
          attributes: ["language"],
        },
        {
          model: Publisher,
          attributes: ["name"],
        },
      ],
    });
    console.log("resultado de busqueda por book", allBooksDB);
    if (allBooksDB.length === 0) {
      console.log("Busqueda Por Author");
      console.log("Buscando", target);
      const author = await Author.findAll({
        attributes: ["name"],
        where: {
          name: {
            [Op.iLike]: `%${target}%`,
          },
        },
        include: [
          {
            model: Book,
            attributes: [
              "id_book",
              "isbn",
              "title",
              "published_date",
              "price",
              "description",
              "rating_ave",
              "image",
              "page_count",
              "url",
            ],
          },
        ],
      });
      return res.send(author);
    }
    res.send(allBooksDB);
  } catch (error) {
    next(error);
  }
};

module.exports = allBooks;
