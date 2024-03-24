/* const { ObjectId } = require("mongoose").Types; */
const { Thought } = require("../models");

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
    console.log("You are adding an reaction");
    console.log(req.body);

    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params._id }, // Find the thought document by its ID
        { $addToSet: { reactions: req.body } }, // Add the new reaction to the 'reactions' array
        { runValidators: true, new: true } // Option to run validators to make sure data follows schemaand return the updated document
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No reaction found with that ID :(" });
      }

      res.json(reaction);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // Remove reaction from a thought
  async removeReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndRemove(
        { _id: req.params._id },
        { $pull: { reaction: { reactionId: req.params._id } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No reaction found with that ID :(" });
      }

      res.json(reaction);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
