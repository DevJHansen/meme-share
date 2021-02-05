const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Load models
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Users = require("./models/User");

//Connect to DB
mongoose.connect(
  "mongodb+srv://Justin:nikond3x@cluster0.a1cxj.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

//Read JSON files
const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/posts.json`, "utf-8")
);

const comments = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/comments.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

//Import into DB
const importData = async () => {
  try {
    await Post.create(posts);
    await Comment.create(comments);
    await Users.create(users);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

//Delete data
const deleteData = async () => {
  try {
    await Post.deleteMany();
    await Comment.deleteMany();
    await Users.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
