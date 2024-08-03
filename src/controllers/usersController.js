const { UsersCollection } = require("../database/models/usersModel");

const add_New_user_controller = async (req, res, next) => {
  try {
    const { email, password, nombre, genero } = req.body;

    const response = await UsersCollection.addUser(
      email,
      password,
      nombre,
      genero
    );

    res.send(response);
  } catch (error) {
    next(error);
  }
};

const login_controller = async (req, res, next) => {
  try {
    const token = req.token;

    res.send({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add_New_user_controller,
  login_controller,
};
