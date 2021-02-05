const express = require("express");
const { checkEmail } = require("../controllers/check");

const User = require("../models/User");
const router = express.Router();

const advancedResults = require("../middleware/advancedResults");

router.route("/email").post(advancedResults(User), checkEmail);

module.exports = router;
