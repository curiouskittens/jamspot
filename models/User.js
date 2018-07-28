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
        required: true,
        unique: true
    },
    instruments: [{
        name: String,
        skill: Number,
        _id: false
    }],
    genres: [String],
    bio: {
        type: String,
        default: ""
    },
    location: {
        lat: Number,
        lng: Number,
        address: String
    },
    jams: [{
        type: Schema.Types.ObjectId,
        ref: "Jam"
    }],
    notifications: [{
        messageType: String,
        message: String
    }],
    soundcloud: {
        type: String,
        default: ""
    },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});

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

UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return callback(err);

        callback(null, isMatch);
    });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
