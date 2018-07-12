const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true 
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
    instruments: [{
        name: String,
        skill: Number,
        _id: false
    }],   
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;