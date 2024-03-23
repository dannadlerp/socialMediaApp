const { Schema, model, Types } = require("mongoose");

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    /* thoughtId: {
      type: Types.ObjectId,
      

      default: () => new Types.ObjectId(),
    }, */
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

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
