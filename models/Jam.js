const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default: "open"
    },
    location: {
        lat: Number,
        lng: Number,
        address: String
    },
    instruments: [{
        name: String,
        quantity: Number,
        _id: false
    }],
    genres: [String],
    admin: {
          type: Schema.Types.ObjectId,
          ref: "User",
    },
    members: [{
          type: Schema.Types.ObjectId,
          ref: "User"
    }],
    joinRequests: [{
          type: Schema.Types.ObjectId,
          ref: "User"
    }],
    posts: [{
          type: Schema.Types.ObjectId,
          ref: "Post"
    }],
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});

const Jam = mongoose.model("Jam", JamSchema);

module.exports = Jam;
