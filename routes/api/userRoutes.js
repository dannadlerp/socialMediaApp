const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
  getFriends,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);
/*.put(editUser) */

// /api/users/:userName
router.route("/:userName/").get(getUsers).post(createUser);

// /api/users/:userName/friends
router.route("/:userName/friends").get(getFriends).post(addFriend);

// /api/users/:userName/friends/:friendId
router.route("/:userName/friends/:friendId").delete(removeFriend);

module.exports = router;
