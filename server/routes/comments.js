const express = require("express");
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const Comment = require("../models/Comment");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getComments)
  .post(protect, authorize("user", "admin"), addComment);

router
  .route("/:id")
  .put(protect, authorize("user", "admin"), updateComment)
  .delete(protect, authorize("user", "admin"), deleteComment);

module.exports = router;
