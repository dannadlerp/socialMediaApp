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
        type: Schema.Types.ObjectId, //scehma types is different from just types to be used in schemas only
        ref: "userSchema",
      },
    ],

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thoughtSchema",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
