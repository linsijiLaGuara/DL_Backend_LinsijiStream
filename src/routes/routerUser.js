const router = require("express").Router();

const {
  add_New_user_controller,
  get_profile_controller,
  login_controller,
} = require("../controllers/usersController");
const { UsersValidatorCollection } = require("../validators/usersValidotor");

const { handleLoginMiddleware } = require("../middlewares/handleLogin");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { searchArtist } = require("../controllers/searchController");

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

router.get("/welcome", authMiddleware, get_profile_controller);
router.get("/search", authMiddleware, searchArtist);
module.exports = router;
