const { Schema, model } = require("mongoose");
const friendSchema = require("./Friend");
const thoughtSchema = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    /*   },
  { */
    friends: [friendSchema],
    thoughts: [thoughtSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
