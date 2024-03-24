const router = require("express").Router();
const {
  getReactions,
  getSingleReaction,
  createReaction,
  deleteReaction,
  updateReaction,
  addFriend,
  removeFriend,
  getFriends,
  getSingleReactionsFriend,
} = require("../../controllers/reactionController");

// /api/reactions
router.route("/").get(getReactions).post(createReaction);

// /api/reactions/:_id
router
  .route("/:_id")
  .get(getSingleReaction)
  .delete(deleteReaction)
  .put(updateReaction);

// /api/reactions/:_id/friends
router.route("/:_id/friends").get(getFriends).post(addFriend);

// /api/reactions/:_id/friends/:friendId
router
  .route("/:_id/friends/:friendId")
  .get(getSingleReactionsFriend)
  .delete(removeFriend);

module.exports = router;
