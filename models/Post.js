const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
