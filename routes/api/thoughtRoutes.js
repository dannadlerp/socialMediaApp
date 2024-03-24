const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,
  getReactions,
  getSingleThoughtsReaction,
} = require("../../controllers/thoughtController.js");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:_id
router
  .route("/:_id")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought)
  .post(addReaction);

// /api/thoughts/:_id/reactions
router.route("/:_id/reactions").get(getReactions).post(addReaction);

// /api/thoughts/:_id/reactions/:reactionId
router
  .route("/:_id/reactions/:reactionId")
  .get(getSingleThoughtsReaction)
  .delete(removeReaction);

module.exports = router;
