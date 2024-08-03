// artistController.js
const cancionCollection = require("../database/models/cancionModel");

const get_all_Song = async (req, res, next) => {
  try {
    const song = await cancionCollection.getAllCancion();

    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get_all_Song,
};
