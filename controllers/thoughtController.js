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
  // Delete a Thought by _id
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
      const reaction = await Reaction.findOne({
        _id: req.params._id,
      }).select("-__v");

      if (!reaction) {
        return res.status(404).json({ message: "No reaction with that id" });
      }

      res.json(reaction);
      console.log(`Reaction  found: ${reaction}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  /* Add a reaction to a thought
format: {
} */

  async addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);

    try {
      // Create a new Reaction using req.body
      const reaction = await Reaction.create(req.body);

      // Find the thought by its _id and update its reactions array
      const updatedThought = await Thought.findOneAndUpdate(
        //{ _id: req.params._id },
        { $addToSet: { reactions: reaction._id } } // Add the new reaction _id to the 'reactions' array
        //{ runValidators: true, new: true } // Option to run validators to make sure data follows schema and return the updated document
      );

      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      // Send the updated thought as the response
      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  // Remove reaction from a thought
  async removeReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndRemove({ _id: req.params._id });

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json({ message: "Reaction successfully deleted" });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
