const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const Post = require("../models/Post");

const advancedResults = require("../middleware/advancedResults");

const commentRouter = require("./comments");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resourse routers
router.use("/:postId/comments", commentRouter);

router
  .route("/")
  .get(advancedResults(Post, "comments"), getPosts)
  .post(protect, authorize("user", "admin"), createPost);

router
  .route("/:id")
  .get(getPost)
  .put(protect, authorize("user", "admin"), updatePost)
  .delete(protect, authorize("user", "admin"), deletePost);

module.exports = router;
