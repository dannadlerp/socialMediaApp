const { Schema, model, Types } = require("mongoose");

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    postDate: {
      type: Date,
      default: Date.now(),
    },
    reactions: [
      {
        type: Schema.Types.ObjectId, //scehma types is different from just types to be used in schemas only
        ref: "reactionSchema",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
