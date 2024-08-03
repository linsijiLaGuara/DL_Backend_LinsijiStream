// artistController.js
const artisCollection = require("../database/models/artistModel");
const albumCollection = require("../database/models/albumModel");

const get_all_artists_controller = async (req, res, next) => {
  try {
    const artists = await artisCollection.getAllArtists();

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
};

const get_all_album_controller = async (req, res, next) => {
  try {
    const album = await albumCollection.getAllAlbum();

    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get_all_artists_controller,
  get_all_album_controller,
};
