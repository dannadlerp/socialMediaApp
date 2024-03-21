const { Schema, model, Types } = require("mongoose");
/* function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const friendSchema = new Schema(
  {
    friendId: {
      type: Types.ObjectId,
      
      default: () => new Types.ObjectId(),
    },
    
    //thoughts key in user model? or thoughtText in thought model?
    thoughts: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: "unnamed thought",
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
  );

  const Friend = model("friend", friendSchema);
  
  module.exports = Friend;
  
  */
