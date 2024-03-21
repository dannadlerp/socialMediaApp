/* const { ObjectId } = require("mongoose").Types; */
const { User, Friend, Thought } = require("../models");

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
  // Get all users
  async getUsers(req, res) {
    try {
      // Retrieve the list of users from the database
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user by name
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        userName: req.params.userName,
      }).select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that username" });
      }

      res.json({
        FriendUsername: await req.params.friendUsername,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a User and remove them from the thought
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: req.params.userName,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      /* const thought = await Thought.findOneAndUpdate(
        { friends: req.params.friendId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "Friend deleted, but no thoughts found",
        });
      } */

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get all friends for a user
  async getFriends(req, res) {
    try {
      const userName = req.params.userName;
      const friends = await Friend.find({ userName: userName });

      if (!friends) {
        return res
          .status(404)
          .json({ message: "No friends found for this user" });
      }

      res.json(friends);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Add a friend to a friend
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
  // Remove friend from a user
  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
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
