const express = require("express");
const router = express.Router();

const {
  add_New_user_controller,
  login_controller,
} = require("../controllers/usersController");
const {
  get_all_artists_controller,
  get_pag_artist_controller,
} = require("../controllers/artistController");
const {
  searchAlbum,
  get_all_album_controller,
  get_pag_album_controller,
} = require("../controllers/albumController");
const welcomeController = require("../controllers/welcomeController"); // Cambio aquí
const { UsersValidatorCollection } = require("../validators/usersValidotor");
const { handleLoginMiddleware } = require("../middlewares/handleLogin");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { searchArtist } = require("../controllers/searchController");
const { get_all_Song } = require("../controllers/songController");
const {
  getAlbumsByArtistName,
} = require("../controllers/albumbyArtistController");

router.post(
  "/register",
  UsersValidatorCollection.addValidator,
  add_New_user_controller
);

router.post(
  "/login",
  handleLoginMiddleware,
  UsersValidatorCollection.addValidator,
  login_controller
);

router.get("/welcome", authMiddleware, welcomeController);
router.get("/artist", authMiddleware, get_pag_artist_controller);
router.get("/album", authMiddleware, get_pag_album_controller);
router.get("/albums", authMiddleware, get_all_album_controller);
router.get("/search", authMiddleware, searchArtist);
router.get("/searchAlbum", authMiddleware, searchAlbum);
router.get("/searchAlbumsByArtist", authMiddleware, getAlbumsByArtistName);
router.get("/song", authMiddleware, get_all_Song);
module.exports = router;
