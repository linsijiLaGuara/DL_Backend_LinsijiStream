const database = require("../dbConfig");

const { handleHashPassword } = require("../../utils/utils");
const addUser = async (email, password, nombre, genero) => {
  try {
    const passwordHash = await handleHashPassword(password);

    const consulta = `
      INSERT INTO usuario (email, password, nombre, genero) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const values = [email, passwordHash, nombre, genero];

    const { rowCount, rows } = await database.query(consulta, values);

    if (rowCount) {
      return {
        msg: "Usuario registrado",
        user: rows[0],
      };
    } else {
      return {
        msg: "Usuario no registrado",
      };
    }
  } catch (error) {
    console.error("Database error:", error);

    const customError = new Error(
      "Error generado en la base de datos en la query de addUser"
    );
    customError.code = 404;
    customError.origin = "DATABASE";
    customError.type = "Register User Error";

    throw customError;
  }
};

const getUserByEmail = async (email) => {
  const consulta = "SELECT * FROM usuario WHERE email = $1;";
  const values = [email];

  const { rows } = await database.query(consulta, values);

  const user = rows[0];

  return user.email;
};

const getPasswordUserByEmail = async (email) => {
  const consulta = "SELECT * FROM usuario WHERE email = $1;";
  const values = [email];

  const { rows } = await database.query(consulta, values);

  const user = rows[0];

  return user.password;
};

const UsersCollection = {
  getPasswordUserByEmail,
  getUserByEmail,
  addUser,
};

module.exports = {
  UsersCollection,
};
