const axios = require("axios");
const { Book, Categorie, Lenguage, Publisher } = require("../../db");
const fillBdd = async () => {
  console.log("ENTER A LA FUNCION BDD");
  const ISBN = [
    9788421866696, 9789963516858, 9789963516865, 9788448195755, 9780190503277,
    9788421866719, 9789963516919, 9789963516926, 9788448609023, 9780190503413,
    9789963489671, 9789963489756, 9789963489831, 9788421866733, 9789963516971,
    9789963516988, 9788448195793, 9780190503284, 9788421866740, 9789963517039,
    9788467587029, 9788448608767, 9788468038506, 9788468201214, 9788421849576,
    9789963510856, 9789963510863, 9788468229485, 9788448191542, 9788467385625,
    9789963510955, 9789963510962, 9788448609924, 9788448609573, 9788467587128,
    9788421866696, 9789963516858, 9789963516865, 9788448195755, 9780190503277,
    9788421866719, 9789963516919, 9789963516926, 9788448609023, 9780190503413,
    9789963489671, 9789963489756, 9789963489831, 9788421866733, 9789963516971,
    9789963516988, 9788448195793, 9780190503284, 9788421866740, 9789963517039,
    9788467587029, 9788448608767, 9788468201214, 9788421849576, 9789963510856,
    9789963510863, 9788468229485, 9788448191542, 9788467385625, 9789963510955,
    9789963510962, 9788448609924, 9788448609573, 9788467587128,
  ];
  for (let i = 0; i < ISBN.length; i++) {
    try {
      let { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN[i]}`
      );
      if (
        data.items[0].id &&
        data.items[0].volumeInfo.title &&
        data.items[0].volumeInfo.authors &&
        data.items[0].volumeInfo.publishedDate &&
        data.items[0].volumeInfo.description &&
        data.items[0].volumeInfo.imageLinks.thumbnail &&
        data.items[0].volumeInfo.lenguage &&
        data.items[0].volumeInfo.categories &&
        data.items[0].volumeInfo.publisher
      ) {
        const book = {
          id: data.items[0].id,
          title: data.items[0].volumeInfo.title,
          authors: data.items[0].volumeInfo.authors,
          publishedDate: data.items[0].volumeInfo.publishedDate,
          description: data.items[0].volumeInfo.description,
          publihser: data.items[0].volumeInfo.publisher,
          image: data.items[0].volumeInfo.imageLinks.thumbnail,
          lenguage: data.items[0].volumeInfo.lenguage,
          categories: data.items[0].volumeInfo.categories,
        };
        console.log(book);
      }
    } catch (error) {
      console.log("and the winner is..",error);
    }
  }
};
module.exports = fillBdd;
