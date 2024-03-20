const { Schema, model, Typ } = require("mongoose");
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

    friends: {
      type: String,
      ref: "Friend",
    },
    thoughts: {
      type: String,
      ref: "Thought",
    },

    /* friends: [friendSchema],
    thoughts: [thoughtSchema], */
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;
