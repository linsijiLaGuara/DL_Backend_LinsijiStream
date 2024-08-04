// routes.js
const router = require("express").Router();

const {
  add_New_user_controller,
  login_controller,
} = require("../controllers/usersController");
const {
  get_all_artists_controller,
  get_all_album_controller,
  get_pag_album_controller,
} = require("../controllers/artistController");

const { UsersValidatorCollection } = require("../validators/usersValidotor");

const { handleLoginMiddleware } = require("../middlewares/handleLogin");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { searchArtist } = require("../controllers/searchController");
const { get_all_Song } = require("../controllers/songController");
const { searchAlbum } = require("../controllers/albumController");
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

router.get("/welcome", authMiddleware, get_all_artists_controller);
router.get("/search", authMiddleware, searchArtist);
router.get("/searchAlbum", authMiddleware, searchAlbum);
router.get("/album", authMiddleware, get_pag_album_controller);

//router.get("/album", authMiddleware, get_all_album_controller);
router.get("/song", authMiddleware, get_all_Song);
module.exports = router;
