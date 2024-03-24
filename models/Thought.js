const { Schema, model, Types } = require("mongoose");

// Schema to create a course model
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
        ref: "thoughtSchema",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
