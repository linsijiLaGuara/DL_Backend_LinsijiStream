// artistController.js
const artisCollection = require("../database/models/artistModel");

const get_all_artists_controller = async (req, res, next) => {
  try {
    const artists = await artisCollection.getAllArtists();

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get_all_artists_controller,
};
