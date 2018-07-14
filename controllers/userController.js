const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.User
            .create(
                // {
                // username: req.body.username,
                // password: req.body.password,
                // name: req.body.name,
                // email: req.body.email
                // }
                req.body
            )
            .then(dbUser => {
                console.log(dbUser),
                res.json(dbUser)
            })
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            })
    },
    update: function(req, res) {
        db.User
            .findOneAndUpdate(
                { _id: req.params.id},
                { $set: req.body },
                { new: true }
            )
            .then(dbUser => {
                console.log(dbUser),
                res.json(dbUser)
            })
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            })

    },
    findOne: function(req, res) {
        db.User
            .findOne(req.query)
            .then(dbUser => {
                console.log(dbUser);
                res.send(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    findOnePopulate: function(req, res) {
        db.User
            .findOne({ _id: req.params.id})
            .populate("jams")
            .then(dbUser => {
                console.log(dbUser);
                res.send(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    findAll: function(req, res) {
        db.User
            .find({})
            .then(dbAllUsers => {
                console.log(dbAllUsers);
                res.send(dbAllUsers);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    remove: function(req, res) {
        db.User
            .findByIdAndRemove({ _id: req.params.id})
            .then(dbUser => {
                console.log(dbUser);
                res.send(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    }

};
