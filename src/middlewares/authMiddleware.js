require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const Authorization = req.header("Authorization");

    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }

    const token = Authorization.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, "JWT_SECRET");

    req.user = {
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  authMiddleware,
};
