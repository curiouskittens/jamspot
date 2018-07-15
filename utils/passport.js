const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

module.exports = function(passport) {
    passport.use(new LocalStrategy((username, password, done) => {
        db.User.findOne({ username: username })
        .then(dbUser => {
            if (!dbUser) {
                return done(null, false, { message: "Invalid username." })
            }

            dbUser.validatePassword(password, function(err, isMatch) {
                if (err) throw err;
                
                if (!isMatch) {
                    done(null, false, { message: "Incorrect password." });
                } else {
                    done(null, dbUser);
                }
            })
        })
        .catch(err => done(err));
    }))

    passport.serializeUser(function(user, done) {
        console.log("Serializing user...");
        done(null, user._id);
    })

    passport.deserializeUser(function(userId, done) {
        console.log("Deserializing user...");
        db.User.findById(userId, (err, dbUser) => done(err, dbUser));
    })
}