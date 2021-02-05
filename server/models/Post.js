const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
      trim: true,
      maxlength: [150, "Title can not be more than 50 characters"],
    },
    content: {
      type: String,
    },
    category: {
      type: String,
      enum: ["funny", "cute", "awesome", "gaming", "other", "news"],
      default: "other",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
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

//Cascade delete comments when a post is deleted
PostSchema.pre("remove", async function (next) {
  console.log(`Comments being removed from post ${this._id}`);
  await this.model("Comment").deleteMany({ post: this._id });
  next();
});

//Reverse populate with virtuals
PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});

module.exports = mongoose.model("Post", PostSchema);
