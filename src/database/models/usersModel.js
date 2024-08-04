const database = require("../dbConfig");
const { handleHashPassword } = require("../../utils/utils");

// Create - Añadir un nuevo usuario
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

// Read - Obtener un usuario por email
const getUserByEmail = async (email) => {
  const consulta = "SELECT * FROM usuario WHERE email = $1;";
  const values = [email];

  const { rows } = await database.query(consulta, values);

  return rows[0];
};

// Read - Obtener la contraseña de un usuario por email
const getPasswordUserByEmail = async (email) => {
  const consulta = "SELECT * FROM usuario WHERE email = $1;";
  const values = [email];

  const { rows } = await database.query(consulta, values);

  return rows[0].password;
};

// Read - Obtener todos los usuarios
const getAllUsers = async () => {
  const consulta = "SELECT * FROM usuario;";

  const { rows } = await database.query(consulta);

  return rows;
};

// Update - Actualizar un usuario por ID
const updateUser = async (id, email, nombre, genero) => {
  const consulta = `
    UPDATE usuario
    SET email = $1, nombre = $2, genero = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [email, nombre, genero, id];

  const { rowCount, rows } = await database.query(consulta, values);

  if (rowCount) {
    return {
      msg: "Usuario actualizado",
      user: rows[0],
    };
  } else {
    return {
      msg: "Usuario no encontrado",
    };
  }
};

// Delete - Eliminar un usuario por ID
const deleteUser = async (id) => {
  const consulta = `
    DELETE FROM usuario
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id];

  const { rowCount, rows } = await database.query(consulta, values);

  if (rowCount) {
    return {
      msg: "Usuario eliminado",
      user: rows[0],
    };
  } else {
    return {
      msg: "Usuario no encontrado",
    };
  }
};

const UsersCollection = {
  getPasswordUserByEmail,
  getUserByEmail,
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
};

module.exports = {
  UsersCollection,
};
