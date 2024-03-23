/* const { ObjectId } = require("mongoose").Types; */
const { User } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      // Retrieve the list of users from the database, populating the friends and thoughts fields
      const users = await User.find().select("-__v");
      console.log(`Users found: ${users}`);

      // Send the users array as the response
      res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // Get a single user by name
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        userName: req.params.userName,
      }).select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.json(
        user /* {
        FriendUsername: await req.params.friendUsername,
      } */
      );
      console.log(`User found: ${user}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      return res.status(500).send(err);
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
      return res.status(404).send(err);
          message: "Friend deleted, but no thoughts found",
        });
      } */

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  // Get all users' friends
  async getFriends(req, res) {
    try {
      // Retrieve the list of users' friends from the database
      const user = await User.findOne({ userName: req.params.userName });

      if (!user) {
        return res.status(404).json({ message: "No user with that username" });
      }

      const friends = user.friends;
      res.json({ message: `User Friends: ${friends}` });

      console.log(`User friend found: ${friends}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  // Get a single user by name
  async getSingleUsersFriend(req, res) {
    try {
      const usersFriend = await User.friends
        .findOne({
          friendName: req.params.userName,
        })
        .select("-__v");

      if (!usersFriend) {
        return res
          .status(404)
          .json({ message: "No friend with that username" });
      }

      res.json(usersFriend);
      console.log(`User found: ${user}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  // Add a friend to a friend
  async addFriend(req, res) {
    console.log("You are adding an friend");
    console.log(req.body);

    try {
      const friend = await User.friend.findOneAndUpdate(
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
      return res.status(500).send(err);
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
      return res.status(500).send(err);
    }
  },
};
