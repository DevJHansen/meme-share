const Post = require("../models/Post");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const UploadFile = require("../utils/uploadFile");
const asyncHandler = require("../middleware/async");

//@desc     Get all posts
//@route    GET /api/v1/posts
//@access   Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc     Get single post
//@route    GET /api/v1/posts/:id
//@access   Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: post });
});

//@desc     Create new post
//@route    POST /api/v1/posts
//@access   Private
exports.createPost = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload a file less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  const uploadRes = await UploadFile.uploadFileToAws(file);

  const newPost = {
    title: req.body.title,
    content: uploadRes.fileUrl,
    category: req.body.category,
    user: req.user.id,
  };

  const post = await Post.create(newPost);

  res.status(201).json({
    success: true,
    data: post,
  });
});

//@desc     Update post
//@route    PUT /api/v1/post/:id
//@access   Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is post creator
  if (post.user.toString() !== req.user.id || req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this post`,
        401
      )
    );
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: post });
});

//@desc     Delete post
//@route    Delete /api/v1/post/:id
//@access   Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is post creator
  if (post.user.toString() !== req.user.id || req.user.role === "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this post`,
        401
      )
    );
  }

  post.remove();

  res.status(200).json({ success: true, data: {} });
});

//@desc     Up vote post
//@route    POST /api/v1/votes/upvotepost
//@access   Private
exports.upVotePost = asyncHandler(async (req, res, next) => {
  // Check if user has upvoted
  const user = await User.find({
    _id: req.body.user,
  });

  const post = await Post.find({
    _id: req.body.post,
  });

  let upVoted = false;

  post[0].upVotes.forEach((vote) => {
    if (vote.toString() === user[0]._id.toString()) {
      upVoted = true;
    }
  });

  if (upVoted) {
    return res.status(200).json({ success: false });
  }

  // Check if user has down voted
  let downVoted = false;

  post[0].downVotes.forEach((vote) => {
    if (vote.toString() === user[0]._id.toString()) {
      downVoted = true;
    }
  });

  // if downvoted then remove down vote from downVotes
  if (downVoted) {
    const newDownVotes = [];
    const downVotes = post[0].downVotes;
    downVotes.forEach((downVote) => {
      if (downVote.toString() !== user[0]._id.toString()) {
        newDownVotes.push(downVote);
      }
    });

    await Post.findByIdAndUpdate(
      req.body.post,
      {
        downVotes: newDownVotes,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  // add user ID to upVotes
  const newUpVotes = [user[0]._id];
  post[0].upVotes.forEach((vote) => {
    if (vote.toString() !== user[0]._id.toString()) {
      newUpVotes.push(vote);
    }
  });

  const updatedPost = await Post.findByIdAndUpdate(
    req.body.post,
    {
      upVotes: newUpVotes,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: updatedPost });
});

//@desc     Remove up vote
//@route    PUT /api/v1/votes/upvotepost
//@access   Private
exports.removePostUpVote = asyncHandler(async (req, res, next) => {
  const user = await User.find({
    _id: req.body.user,
  });

  const post = await Post.find({
    _id: req.body.post,
  });

  let upVoted = false;

  post[0].upVotes.forEach((vote) => {
    if (vote.toString() === user[0]._id.toString()) {
      upVoted = true;
    }
  });

  if (upVoted) {
    const newUpvotes = [];
    const upVotes = post[0].upVotes;
    upVotes.forEach((upVote) => {
      if (upVote.toString() !== user[0]._id.toString()) {
        newUpvotes.push(upVote);
      }
    });

    const updatedPost = await Post.findByIdAndUpdate(
      req.body.post,
      {
        upVotes: newUpvotes,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({ success: true, data: updatedPost });
  } else {
    return res.status(200).json({ success: false });
  }
});

//@desc     Down vote post
//@route    POST /api/v1/votes/downvotepost
//@access   Private
exports.downVotePost = asyncHandler(async (req, res, next) => {
  const user = await User.find({
    _id: req.body.user,
  });

  const post = await Post.find({
    _id: req.body.post,
  });

  let downVoted = false;

  post[0].downVotes.forEach((vote) => {
    if (vote.toString() === user[0]._id.toString()) {
      downVoted = true;
    }
  });

  if (downVoted) {
    return res.status(200).json({ success: false });
  }

  let upVoted = false;

  post[0].upVotes.forEach((vote) => {
    if (vote.toString() === user[0]._id.toString()) {
      upVoted = true;
    }
  });

  if (upVoted) {
    const newUpVotes = [];
    const upVotes = post[0].upVotes;
    upVotes.forEach((upVote) => {
      if (upVote.toString() !== user[0]._id.toString()) {
        newUpVotes.push(upVote);
      }
    });

    await Post.findByIdAndUpdate(
      req.body.post,
      {
        upVotes: newUpVotes,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  const newDownVotes = [user[0]._id];
  post[0].downVotes.forEach((vote) => {
    if (vote.toString() !== user[0]._id.toString()) {
      newDownVotes.push(vote);
    }
  });

  const updatedPost = await Post.findByIdAndUpdate(
    req.body.post,
    {
      downVotes: newDownVotes,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: updatedPost });
});

//@desc     Remove down vote
//@route    PUT /api/v1/votes/downvotepost
//@access   Private
exports.removePostDownVote = asyncHandler(async (req, res, next) => {
  const user = await User.find({
    _id: req.body.user,
  });

  const post = await Post.find({
    _id: req.body.post,
  });

  let downVoted = false;

  post[0].downVotes.forEach((vote) => {
    if (vote.toString() === user[0]._id.toString()) {
      downVoted = true;
    }
  });

  if (downVoted) {
    const newDownvotes = [];
    const downVotes = post[0].downVotes;
    downVotes.forEach((downVote) => {
      if (downVote.toString() !== user[0]._id.toString()) {
        newDownvotes.push(downVote);
      }
    });

    const updatedPost = await Post.findByIdAndUpdate(
      req.body.post,
      {
        downVotes: newDownvotes,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({ success: true, data: updatedPost });
  } else {
    return res.status(200).json({ success: false });
  }
});
