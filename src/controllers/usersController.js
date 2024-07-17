const { UsersCollection } = require("../database/models/usersModel");

const add_New_user_controller = async (req, res, next) => {
  try {
    const { email, password, nombre, imagen } = req.body;

    const response = await UsersCollection.addUser(
      email,
      password,
      nombre, imagen
    );

    res.send(response);
  } catch (error) {
    next(error);
  }
};

const get_profile_controller = async (req, res, next) => {
  try {
    const { email } = req.user;

    res.send({ user: { email } });
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
  get_profile_controller,
};
