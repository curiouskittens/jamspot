const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Set up passport
require("./utils/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Define API routes here
app.use(routes(passport));

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/jamspot", {
    useNewUrlParser: true
  }
).then(() => console.log("🥞 ==> Database connection established!"))
.catch(err => console.log(err))

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
