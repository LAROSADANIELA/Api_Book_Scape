const express = require('express');
const {
  registerUser,
  loginUser,
  searchUserById,
  getUsers,
} = require("../controllers/users");
const router = express.Router();

/* GET users listing. */
router.get("/", getUsers);
router.get("/:id", searchUserById);
router.post("/", registerUser);
router.post("/login", loginUser);


module.exports = router;
