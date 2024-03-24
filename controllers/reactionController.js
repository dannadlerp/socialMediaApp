/* const { ObjectId } = require("mongoose").Types; */
const { Reaction } = require("../models");

module.exports = {
  // Get all reactions
  async getReactions(req, res) {
    try {
      const reactions = await Reaction.find().select("-__v");
      console.log(`Reactions found: ${reactions}`);

      // Send the reactions array as the response
      res.json(reactions);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // Get a single reaction by _id
  async getSingleReaction(req, res) {
    try {
      const reaction = await Reaction.findOne({
        _id: req.params._id,
      }).select("-__v");

      if (!reaction) {
        return res.status(404).json({ message: "No such reaction exists" });
      }

      res.json(
        reaction /* {
        FriendReactionname: await req.params.friendReactionname,
      } */
      );
      console.log(`Reaction found: ${reaction}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  /*   create a new reaction
  format: {
	"reactionName": "test9"
}
 */

  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);
      res.json(reaction);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // Delete a Reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndRemove({
        _id: req.params._id,
      });

      if (!reaction) {
        return res.status(404).json({ message: "No such reaction exists" });
      }

      res.json({ message: "Reaction successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  // Update reaction data

  /* format: {
	"reactionName": "Johnsoon",
	"friends": [
		"65fe2c40fc860a281a7a5319"
	],
	"thoughts": []
} */

  async updateReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndUpdate(
        { _id: req.params._id }, // Find the reaction by _id
        req.body, // Update with the data from request body
        { new: true } // Return the updated document
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No reaction found with that ID" });
      }

      res.json(reaction);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  // Get all reactions' friends
  async getFriends(req, res) {
    try {
      // Retrieve the list of reactions' friends from the database
      const reaction = await Reaction.findOne({ _id: req.params._id });

      if (!reaction) {
        return res.status(404).json({ message: "No reaction with that id" });
      }

      const friends = reaction.friends;
      res.json({ message: `Reaction Friends: ${friends}` });

      console.log(`Reaction friend found: ${friends}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  // Get a single friend by id
  async getSingleReactionsFriend(req, res) {
    try {
      const reaction = await Reaction.findOne({
        _id: req.params._id,
      }).select("-__v");

      if (!reaction) {
        return res.status(404).json({ message: "No reaction with that id" });
      }

      res.json(reaction);
      console.log(`Reaction found: ${reaction}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  /* Add a friend to a reaction
format: {
  "reactionName": "JohnDoe",
  "friends": ["65fe2c40fc860a281a7a5319"]
} */

  async addFriend(req, res) {
    console.log("You are adding an friend");
    console.log(req.body);

    try {
      const friend = await Reaction.findOneAndUpdate(
        { _id: req.params._id }, // Find the reaction document by its ID
        { $addToSet: { friends: req.body } }, // Add the new friend to the 'friends' array
        { runValidators: true, new: true } // Option to run validators to make sure data follows schemaand return the updated document
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend found with that ID :(" });
      }

      res.json(friend);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // Remove friend from a reaction
  async removeFriend(req, res) {
    try {
      const friend = await Reaction.findOneAndRemove(
        { _id: req.params._id },
        { $pull: { friend: { friendId: req.params._id } } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend found with that ID :(" });
      }

      res.json(friend);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
