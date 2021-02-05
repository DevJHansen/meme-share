const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

//@desc     Get comments
//@route    GET /api/v1/comments
//@route    GET /api/v1/posts/:postId/comments
//@access   Public
exports.getComments = asyncHandler(async (req, res, next) => {
  if (req.params.postId) {
    const comments = await Comment.find({ post: req.params.postId });

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc     Get add comment
//@route    POST /api/v1/postId/comments
//@access   Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.postId}`, 404)
    );
  }

  const comment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: comment,
  });
});

//@desc     Update comment
//@route    PUT /api/v1/comments/:id
//@access   Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure comment belongs to user or user is admin
  if (comment.user.toString() !== req.user.id || req.user.role !== "admin") {
    return next(new ErrorResponse(`No authorized to update comment`, 401));
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: comment,
  });
});

//@desc     Delete comment
//@route    DELETE /api/v1/comments/:id
//@access   Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  console.log(typeof comment.user.toString());
  console.log(req.user.id);

  // Make sure comment belongs to user or user is admin
  if (comment.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`No authorized to delete comment`, 401));
  }

  await comment.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
