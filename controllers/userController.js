/* const { ObjectId } = require("mongoose").Types; */
const { User } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v");
      console.log(`Users found: ${users}`);

      // Send the users array as the response
      res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // Get a single user by _id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params._id,
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
  /*   create a new user
  format: {
	"userName": "test9"
}
 */

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: req.params._id,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  // Update user data

  /* format: {
	"userName": "Johnsoon",
	"friends": [
		"65fe2c40fc860a281a7a5319"
	],
	"thoughts": []
} */

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params._id }, // Find the user by _id
        req.body, // Update with the data from request body
        { new: true } // Return the updated document
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },

  // Get all users' friends
  async getFriends(req, res) {
    try {
      // Retrieve the list of users' friends from the database
      const user = await User.findOne({ _id: req.params._id });

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      const friends = user.friends;
      res.json({ message: `User Friends: ${friends}` });

      console.log(`User friend found: ${friends}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  // Get a single friend by id
  async getSingleUsersFriend(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params._id,
      }).select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      res.json(user);
      console.log(`User found: ${user}`);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  /* Add a friend to a user
format: {
  "userName": "JohnDoe",
  "friends": ["65fe2c40fc860a281a7a5319"]
} */

  async addFriend(req, res) {
    console.log("You are adding an friend");
    console.log(req.body);

    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params._id }, // Find the user document by its ID
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
  // Remove friend from a user
  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndRemove(
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
