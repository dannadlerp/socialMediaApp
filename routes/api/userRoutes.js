const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
  getFriends,
  getSingleUsersFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:_id
router
  .route("/:_id")
  .get(getSingleUser)
  .delete(deleteUser)
  .put(updateUser)
  .post(addFriend);

// /api/users/:_id/friends
router.route("/:_id/friends").get(getFriends);

// /api/users/:_id/friends/:friendId
router
  .route("/:_id/friends/:friendId")
  .get(getSingleUsersFriend)
  .delete(removeFriend);

module.exports = router;
