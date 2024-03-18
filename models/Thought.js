const { Schema, model } = require("mongoose");

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtName: {
      type: String,
      required: true,
    },
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
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
