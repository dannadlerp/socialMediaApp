const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 50,
    },

    friends: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],

    thoughts: [
      {
        type: Types.ObjectId,
        ref: "Thought",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;
