/* const { ObjectId } = require("mongoose").Types; */
const { Friend, Thought } = require("../models");

// Aggregate function to get the number of friends overall
const headCount = async () => {
  const numberOfFriends = await Friend.aggregate().count("friendCount");
  return numberOfFriends;
};

/* // Aggregate function for getting the overall grade using $avg
const grade = async (friendId) =>
  Friend.aggregate([
    // only include the given friend by using $match
    { $match: { _id: new ObjectId(friendId) } },
    {
      $unwind: "$friends",
    },
    {
      $group: {
        _id: new ObjectId(friendId),
        overallGrade: { $avg: "$friends.score" },
      },
    },
  ]); */

module.exports = {
  // Get all friends
  async getFriends(req, res) {
    try {
      const friends = await Friend.find();

      const friendObj = {
        friends,
        headCount: await headCount(),
      };

      res.json(friendObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single friend
  async getSingleFriend(req, res) {
    try {
      const friend = await Friend.findOne({ _id: req.params.friendId }).select(
        "-__v"
      );

      if (!friend) {
        return res.status(404).json({ message: "No friend with that ID" });
      }

      res.json({
        FriendUsername: await req.params.friendUsername,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new friend
  async createFriend(req, res) {
    try {
      const friend = await Friend.create(req.body);
      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a friend and remove them from the thought
  async deleteFriend(req, res) {
    try {
      const friend = await Friend.findOneAndRemove({
        _id: req.params.friendId,
      });

      if (!friend) {
        return res.status(404).json({ message: "No such friend exists" });
      }

      const thought = await Thought.findOneAndUpdate(
        { friends: req.params.friendId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "Friend deleted, but no thoughts found",
        });
      }

      res.json({ message: "Friend successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend
  async addFriend(req, res) {
    console.log("You are adding an friend");
    console.log(req.body);

    try {
      const friend = await Friend.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend found with that ID :(" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend from a friend
  async removeFriend(req, res) {
    try {
      const friend = await Friend.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friend: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend found with that ID :(" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
