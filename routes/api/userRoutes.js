const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
  /*   addUser,
   */
} = require("../../controllers/userController");

// /api/users
router
  .route("/")
  .get(getUsers)
  /*.put(editUser) */
  .post(createUser);

// /api/users/:userName
router.route("/:userName");
router.get(getSingleUser);
router.delete(deleteUser);

// /api/users/:userName/friends
router.route("/:userName/friends");
router.get(getFriends);
router.post(addFriend);

// /api/users/:userName/friends/:friendId
router.route("/:userName/friends/:friendId");
router.delete(removeFriend);

module.exports = router;
