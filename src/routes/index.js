var express = require("express");

const books = require("./books");
const users = require("./users");
const favorite = require("./favorite");

var router = express.Router();

router.use("/books", books);
router.use("/users", users);
router.use("/favorites", favorite);

module.exports = router;
