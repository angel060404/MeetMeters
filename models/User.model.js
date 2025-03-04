const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    eventsAtt: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    },
    postVer: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    about: {
      type: String,
      default: ''
    },
    profilePic: {
      type: String,
      default: 'https://www.idlememe.com/wp-content/uploads/2021/10/white-cat-meme-idlememe-1-300x300.jpg'
    },
    role: {
      type: String,
      enum: ['GUIDE', 'USER', 'ADMIN'],
      default: 'USER'
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
