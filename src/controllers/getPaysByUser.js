const { User, Pay } = require("../db/models"); // Asegúrate de importar tus modelos de la base de datos

const getPaysByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if(!userId) return res.status(400).json({message:"Se requiere un Id de Usuario"})

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const pays = await Pay.findAll({
      where: { UserId: userId },
    });

    if(!pays) return res.status(200).json({message:"No hay pago redistrados para este usuario"})

    return res.send(pays);
  } catch (error) {
    next(error);
  }
};

module.exports = getPaysByUser;