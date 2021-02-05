const express = require("express");
const {
  upVotePost,
  removePostUpVote,
  downVotePost,
  removePostDownVote,
} = require("../controllers/posts");

const router = express.Router();

router.route("/upvotepost").post(upVotePost);
router.route("/upvotepost").put(removePostUpVote);
router.route("/downvotepost").post(downVotePost);
router.route("/downvotepost").put(removePostDownVote);

module.exports = router;
