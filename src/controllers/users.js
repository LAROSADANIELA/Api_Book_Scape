const { User, ShoppingCart, Pay, Review, Favorite, Order, Book } = require("../db");
const bcrypt = require("bcrypt");
const { MY_SECRET } = process.env;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

//CONFIGURACIONES ----------------------------------------
//nm i bcrypt
//npm i jsonwebtoken
//agrgar MY_SECRET en .env
//--------------------------------------------------------

//Registro de un nuevo usuario -----------------------------------------------
const registerUser = async (req, res, next) => {
  try {
    const { email, password, username, admin, born_date, active } = req.body;
    // Encriptar la contraseña
    const saltRounds = 10; // Número de rondas de hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
      admin: admin,
      born_date: born_date,
      active: active,
    });
    const cartToAssociate = await ShoppingCart.create();
    await cartToAssociate.setUser(newUser);

    console.log({
      message: "User created succesfully!",
      id: newUser.id,
      email: newUser.email,
    });

    res.send({
      message: "User created succesfully!",
      id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

//Login de un usuario ya registrado --------------------------------------------
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userCheck = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: username }],
      },
    });

    if (!userCheck) {
      return res.send("User not found");
    }

    // Comparar contraseñas usando bcrypt.compare()
    const passwordMatches = await bcrypt.compare(password, userCheck.password);

    if (!passwordMatches) {
      return res.send("Password does not match!");
    } else {
      const jwtToken = jwt.sign(
        {
          //creacion del token
          id: userCheck.id,
          email: userCheck.email,
        },
        MY_SECRET,
        { expiresIn: "12h" }
      );
      res.send({
        token: jwtToken,
        message: "Login succesfully!",
        id: userCheck.id,
        email: userCheck.email,
        username: userCheck.username,
      });
    }
  } catch (error) {
    next(error);
  }
};

//Buscar usuarios por username
//si no recibe ningun parametro devuelve todos los usuarios ----------------------------------------------

const getUsers = async (req, res, next) => {
  try {
    const { username } = req.query;
    if (username) {
      const searchUser = await User.findOne(
        {
          include: [
          {
            model: ShoppingCart,
            attributes: ["cart_id"],
            include: Book,
          },
          {
            model: Favorite,
            attributes: ["BookId"],
          },
          {
            model: Review,
          },
          {
            model: Order,
          },
          {
            model: Pay,
          },
        ],
        where: {
          username: {
            [Op.iLike]: `%${username}%`,
          },
        },
        attributes: { exclude: ["password"] },
      });
      if (searchUser) res.send(searchUser);
      else res.send({ message: "User has not been found" });
    } else {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      res.send(users);
    }
  } catch (error) {
    next(error);
  }
};

//Buscar usuarios por ID ----------------------------------------------
const searchUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchUser = await User.findByPk(id, {
      attributes: ["id", "email", "username", "born_date"],
      include: [
        {
          model: ShoppingCart,
        },
        {
          model: Favorite,
        },
        {
          model: Review,
        },
        {
          model: Order,
        },
        {
          model: Pay,
        },
      ],
    });

    res.send(searchUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  searchUserById,
  getUsers,
};
