const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Post = require("../models/Post");

//@desc     Check Email
//@route    POST /api/v1/check/email
//@access   Public
exports.checkEmail = asyncHandler(async (req, res, next) => {
  const user = await User.find({
    email: req.body.email,
  });

  if (user.length) {
    return res.status(200).json({
      success: false,
    });
  }

  res.status(200).json({
    success: true,
  });
});
