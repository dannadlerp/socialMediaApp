const { Schema, Types } = require("mongoose");
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const friendSchema = new Schema(
  {
    friendId: {
      type: Types.ObjectId,
      /* type: Schema.Types.ObjectId, */

      default: () => new Types.ObjectId(),
    },
    friendUsername: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
    },
    default: "unnamed friend" /* function () {
      return `Friend${getRandomInt(1, 20)}`;
    } */,
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = friendSchema;
