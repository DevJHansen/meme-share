const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: String,
      required: [true, "Please add a comment"],
      maxlength: [500, "Comment can not be more than 500 characters"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    upVotes: {
      type: [mongoose.Schema.ObjectId],
      ref: "User",
    },
    downVotes: {
      type: [mongoose.Schema.ObjectId],
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
