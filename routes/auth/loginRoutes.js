const router = require("express").Router();

module.exports = passport => {
    router.route("/login")
        .post(passport.authenticate("local", {
            successRedirect: "/home",
            failureRedirect: "/login"
        }))

    return router;
}