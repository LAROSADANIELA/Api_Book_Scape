const axios = require("axios");
const { Book, Tag, Language, Publisher, Author } = require("../db");
const book = require("../models/book");

const createBdd = async (auxTags,auxLanguage,aux2Publisher,aux2Author,books) => {
  try{
    // console.log("Lenguajes: ",auxLanguage);
   // console.log("Tags: ",auxTags);
   // console.log("TypeOf: ",typeof(auxTags));
    // console.log("Publishers: ",aux2Publisher);
    // console.log("Autores: ",aux2Author);
    // console.log("entre al try para llenar tablas"); 
    // console.log("auxTags.length: ",auxTags.length); 
    for(let i=0; i<auxTags.length; i++){
      //console.log("se intentara crear Tag: ",auxTags[i]);
      await Tag.create({
        name: auxTags[i],
      })
    }
    // console.log("auxLanguage.length: ",auxLanguage.length); 
    for(let i=0; i<auxLanguage.length; i++){
      //console.log("se intentara crear Language: ",auxLanguage[i]);
      await Language.create({
        language: auxLanguage[i],
      })
    }
    // console.log("aux2Publisher.length: ",aux2Publisher.length); 
    for(let i=0; i<aux2Publisher.length; i++){
      //console.log("se intentara crear Publisher: ",aux2Publisher[i]);
      await Publisher.create({
        name: aux2Publisher[i],
      })
    }
    // console.log("aux2Author.length: ",aux2Author.length); 
    for(let i=0; i<aux2Author.length; i++){
      //console.log("se intentara crear Author: ",aux2Author[i]);
      await Author.create({
        name: aux2Author[i],
      })
    }
    for(let i=0; i<books.length; i++){
      // console.log ("authors",books[i].authors)
      // console.log ("publisher",books[i].publisher)
      // console.log ("language",books[i].language)
      // console.log ("tags",books[i].tags)
      const tagsId = await Tag.findAll({
        attributes: ["id"],
        where: {
          name: books[i].tags,
        },
      });
      const authorsId = await Author.findAll({
        attributes: ["id"],
        where: {
          name: books[i].authors,
        },
      });
      const languageId = await Language.findAll({
        attributes: ["id"],
        where: {
          language: books[i].language,
        },
      });
      const publisherId = await Publisher.findAll({
        attributes: ["id"],
        where: {
          name: books[i].publisher,
        },
      });

      console.log ("tagsId",tagsId[0].dataValues.id);
      console.log ("authorsId",authorsId[0].dataValues.id);
      console.log ("languageId",languageId[0].dataValues.id);
      console.log ("publisherId",publisherId[0].dataValues.id);

      const bookCreate = await Book.create({ 
        isbn: books[i].isbn,
        title: books[i].title,
        published_date: books[i].published_date,
        description: books[i].description,
        image: books[i].image,
        price: books[i].price,
        // authors: books[i].authors,
        // publisher: books[i].publisher,
        // language: books[i].language,
        // tags: books[i].tags,
      })

      

      await bookCreate.addTag(tagsId/*[0].dataValues.id*/);
      await bookCreate.addAuthor(authorsId);
      await bookCreate.addPublisher(publisherId);
      await bookCreate.addLanguage(languageId);

    }
  }catch(err){
    console.log(err);
  };
}

const fillBdd = async (req, res) => {
  console.log("ENTER A LA FUNCION BDD");
  const books = [];
  const ISBN = [
    9780385534260, 9780274810567, 9780385528207, 9781250326751, 9780593652961,
    9780063226081, 9780807014271, 9780375726262, 9781878424365, 9786070780363,
    9780988221895, 9780988221895, 9781950922321, 9781476710402, 9780142403877,
    9781644737705, 9789974878068, 9780062511409, 9798388798442, 9780140449266,
    9781529111798, 9780156013987, 9783836587020, 9781452174464, 9780142437964,
    9781419729669, 9780934868075, 9780143106494, 9780140446043, 9780140446456,
    9782070360024, 9780805212679, 9783836587020, 9780863159473, 9780140441185,
    9780805243550, 9780142437186, 9780142437186, 9780143105244, 9780198321668,
    9780198328704, 9780486284699, 9780140150629, 9780140445145, 9780140445145,
    9781442498327, 9781635575576, 9781394196500, 9780545162074, 9781685130732,
    9780142407332, 9781476764665, 9781416995593, 9781728205489, 9780399501487,
    9781416995562, 9781728210292,

    9780789910820, 9798651196104, 9780124077263, 9781118170519, 9798391200475,
    9780739048122, 9783836503990, 9783836535601, 9780739048153, 9780739054628,
    9783836559799, 9783836560146, 9783836529044, 9783836565677, 9781451695199,

    9798388798442, 9788491291916, 9786070788147, 9786070796746, 9781878424532,
    9786070799396, 9786070774249, 9781644737781, 9788419421890, 9786073821001,
  ];
  try {
    const API_KEY = "AIzaSyBs3jC5ZUrlZ43rj2FdNGtg8SKQZk_aRJo"; 
    for (let i = 0; i < ISBN.length; i++) {
     // console.log(`Se realiza la busqueda del libro:${ISBN[i]}`);
      let { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN[i]}&key:${API_KEY}`
      );

      
      const book = {
        isbn: ISBN[i].toString(),
        title: data.items[0].volumeInfo.title,
        authors: data.items[0].volumeInfo.authors ? data.items[0].volumeInfo.authors : ["none"],
        published_date: Number(data.items[0].volumeInfo.publishedDate.slice(0,-6)),
        description: data.items[0].volumeInfo.description,
        publisher: data.items[0].volumeInfo.publisher ? data.items[0].volumeInfo.publisher : "Morgan Kaufmann",
        image: data.items[0].volumeInfo.imageLinks.thumbnail,
        language: data.items[0].volumeInfo.language ? data.items[0].volumeInfo.language : "es",
        tags: data.items[0].volumeInfo.categories ? data.items[0].volumeInfo.categories : ["Fiction"],
        price: (Math.random() * 50).toFixed(2),
      };
      books.push(book);
    }
    
    
    const success = {
      result: "success",
      prueba: "prueba llenar BDD",
    };
    res.status(200).json(success);
    books.forEach((book) => {
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
  /////////////////////////////////////////////
  const categories = [];
  const language = [];
  const publisher = [];
  const author = []; 
  books.forEach((book) => {
    categories.push(book.tags);
    language.push(book.language);
    publisher.push(book.publisher);
    author.push(book.authors);
  });
  // aux es un flat de categories que es un arrays de arrays
  const aux = categories.flat();
  const auxAuthor = author.flat();
  const aux2=[];
  const auxPublisher = [];
  //Se eliminan los valores null
  aux.forEach((item)=>{
    //pushes only unique element
    if(item !== null){
      aux2.push(item);
    }
  })
  publisher.forEach((item)=>{
    //pushes only unique element
    if(item !== null){
      auxPublisher.push(item);
    }
  })
  /////////////////////////////////////////////////
  //console.log(books);}

  //se eliminan duplicados
  //const auxTags = (new Set (aux2));
  const auxTags = aux2.filter((tag,index) => {
    return aux2.indexOf(tag) === index;
  })
  
  //const auxLanguage = (new Set (language));
  const auxLanguage = language.filter((tag,index) => {
    return language.indexOf(tag) === index;
  })
  
  //const aux2Publisher = (new Set (auxPublisher));
  const aux2Publisher = auxPublisher.filter((tag,index) => {
    return auxPublisher.indexOf(tag) === index;
  })

 // const aux2Author = (new Set (auxAuthor));
  const aux2Author = auxAuthor.filter((tag,index) => {
    return auxAuthor.indexOf(tag) === index;
  })


  createBdd(auxTags,auxLanguage,aux2Publisher,aux2Author,books);

 
  // books.forEach(book =>{
  //   console.log("//////////////////////////////////////////////////")
  //   console.log("isbn: " + book.isbn);
  //   console.log("title: " + book.title);
  //   console.log("authors: " + book.authors);
  //   console.log("publishedDate: " + book.published_date);
  //   console.log("description: " + book.description.slice(0, 30));
  //   console.log("publihser: " + book.publisher);
  //   console.log("image: " + book.image);
  //   console.log("lenguage: " + book.language);
  //   console.log("categories: " + book.tags);
  //   console.log("price:", book.price);
  //   console.log("//////////////////////////////////////////////////")
  // }
  // )
};
module.exports = fillBdd;