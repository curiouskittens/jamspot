const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },   
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;