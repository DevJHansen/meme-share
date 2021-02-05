const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

//load env variables
dotenv.config({ path: "./config/config.env" });

//Conect to database
connectDB();

//Route files
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const auth = require("./routes/auth");
const users = require("./routes/users");
const check = require("./routes/check");
const votes = require("./routes/votes");

const app = express();

//Body parser (parses the body of the request to json)
app.use(express.json());

// Cookie parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent cross site scripting attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10mins
  max: 100,
});

app.use(limiter);

// Prevent http param polution
app.use(hpp());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/v1/posts", posts);
app.use("/api/v1/comments", comments);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/check", check);
app.use("/api/v1/votes", votes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
