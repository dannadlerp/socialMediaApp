/* const { ObjectId } = require("mongoose").Types; */
const { Thought, Reaction } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select("-__v");
      console.log(`Thoughts found: ${thoughts}`);

      // Send the thoughts array as the response
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // Get a single thought by _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params._id,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.json(thought);
      console.log(`Thought found: ${thought}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  /*   create a new thought
  format: {
  "thoughtText": " Test thought3",
	"reactions": ["That's cool"]  
}

postDate and reactions will default to the current date and an empty array
 */

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // Delete a Thought and remove them from the thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params._id,
      });

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  // Update thought data

  /* format: {
	"thoughtText": "Johnsoon",
	"reactions": [
		"65fe2c40fc860a281a7a5319"
	],
	"thoughts": []
} */

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params._id }, // Find the thought by _id
        req.body, // Update with the data from request body
        { new: true } // Return the updated document
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  // Get all thoughts' reactions
  async getReactions(req, res) {
    try {
      // Retrieve the list of thoughts' reactions from the database
      const thought = await Thought.findOne({ _id: req.params._id });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that id" });
      }

      const reactions = thought.reactions;
      res.json({ reactions });

      console.log(`Thought reaction found: ${reactions}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  // Get a single reaction by id
  async getSingleThoughtsReaction(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params._id,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that id" });
      }

      res.json(thought);
      console.log(`Thought found: ${thought}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  /* Add a reaction to a thought
format: {
  "thoughtText": "JohnDoe",
  "reactions": ["65fe2c40fc860a281a7a5319"]
} */

  async addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);

    try {
      // Create a new reaction with the provided reactionText
      const reaction = await Reaction.create({
        reactionText: req.body.reactionText,
      });

      // Get the _id of the newly created reaction
      const newReactionId = reaction._id;

      // Update the referenced Thought document to include the new reaction _id in its reactions array
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params._id },
        { $addToSet: { reactions: newReactionId } }, // Add the new reaction _id to the 'reactions' array
        { runValidators: true, new: true } // Option to run validators to make sure data follows schema and return the updated document
      );

      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json(updatedThought);
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  // Remove reaction from a thought
  async removeReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params._id },
        { $pull: { reactions: req.params.reactionId } }, // Remove the specified reaction ID from the 'reactions' array
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json(updatedThought);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
