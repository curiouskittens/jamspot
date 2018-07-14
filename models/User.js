const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
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
    genres: [String],
    image: {
        type: String,
        default: "No Image"
    },
    bio: String,
    location: {
        lat: Number,
        lng: Number,
        address: String
    },
    jams: [{
          type: Schema.Types.ObjectId,
          ref: "Jam"
    }],
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

UserSchema.pre("save", function(next) {
    const user = this;
    if (!user.isModified("password")) return next();
    
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
    
            user.password = hash;
            next();
        })
    })
})

module.exports = User;
