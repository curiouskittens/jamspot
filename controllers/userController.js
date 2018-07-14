const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.User
            .create(req.body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    update: function(req, res) {
        db.User
            .findOneAndUpdate(
                { _id: req.params.id},
                { $set: req.body },
                { new: true }
            )
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    findOne: function(req, res) {
        db.User
            .findOne(req.query)
            .then(dbUser => res.send(dbUser))
            .catch(err => res.send(err))
    },
    findOnePopulate: function(req, res) {
        db.User
            .findOne({ _id: req.params.id})
            .populate("jams")
            .then(dbUser => res.send(dbUser))
            .catch(err => res.send(err))
    },
    findAll: function(req, res) {
        db.User
            .find({})
            .then(dbAllUsers => res.send(dbAllUsers))
            .catch(err => res.send(err))
    },
    remove: function(req, res) {
        db.User
            .findByIdAndRemove({ _id: req.params.id})
            .then(dbUser => res.send(dbUser))
            .catch(err => res.send(err))
    },
    login: function(req, res) {
        db.User
            .findOne({ username: req.body.username})
            .then(dbUser => {
                dbUser.validatePassword(req.body.password, function(err, isMatch) {
                    if (err) throw err;
                    res.send(isMatch);
                })
            })
            .catch(err => res.status(422).json(err))
    }
};
