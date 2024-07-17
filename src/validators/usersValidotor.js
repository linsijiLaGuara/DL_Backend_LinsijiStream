const { header, param, body, validationResult } = require("express-validator");

const addValidator = [
  body("email")
    .notEmpty()
    .withMessage("Agrega Tu email")
    .isEmail()
    .withMessage("Formato Incorrecto"),

  body("password")
    .notEmpty()
    .withMessage("Agrega tu contraseña")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Za-z]/)
    .withMessage("La contraseña debe contener al menos una letra")
    .matches(/\d/)
    .withMessage("La contraseña debe contener al menos un número"),

  (req, res, next) => {
    const errors = validationResult(req).mapped();
    if (Object.keys(errors).length) {
      res.status(400).send(errors);
    } else {
      next();
    }
  },
];

const UsersValidatorCollection = {
  addValidator,
};

module.exports = {
  UsersValidatorCollection,
};
