const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema(
  {
    reactionText: {
      type: String,
      required: true,
      max_length: 280,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
