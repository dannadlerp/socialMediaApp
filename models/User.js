const { Schema, model, Type } = require("mongoose");
/* const friendSchema = require("./Friend"); */
const thoughtSchema = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 50,
    },

    friends: { type: Schema.Types.ObjectId },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;
