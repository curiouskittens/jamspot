var db = require("../models");

module.exports = function(app) {
    app.get("/api/user/create/:username", function(req, res) {
        console.log(req.params.username);
        db.User.findOne({
            username: req.params.username
        })
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
    })

    app.post("/api/user/create", function(req, res) {
        db.User.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
        })
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
    });
}