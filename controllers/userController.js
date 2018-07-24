const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.User
            .create(req.body)
            .then(dbUser => res.status(200).json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    update: function(req, res) {
        db.User
            .findOneAndUpdate(
                { _id: req.query._id },
                { $set: req.body },
                { new: true }
            )
            .then(dbUser => res.status(200).json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    findOne: function(req, res) {
        db.User
            .findOne(req.query, { password: 0 })
            .then(dbUser => res.status(200).json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    findOnePopulate: function(req, res) {
        db.User
            .findOne({ _id: req.params.id })
            .populate({path: "jams", populate:{path:"joinRequests"}})
            .then(dbUser => res.status(200).json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    findAll: function(req, res) {
        db.User
            .find({})
            .then(dbAllUsers => res.status(200).json(dbAllUsers))
            .catch(err => res.status(422).json(err))
    },
    remove: function(req, res) {
        db.User
            .findByIdAndRemove({ _id: req.params.id })
            .then(dbUser => res.status(200).json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    login: function(req, res) {
        db.User
            .findOne({ username: req.body.username })
            .then(dbUser => {
                dbUser.validatePassword(req.body.password, function(err, isMatch) {
                    if (err) throw err;
                    res.status(200).json({ userId: dbUser._id, isMatch: isMatch })
                })
            })
            .catch(err => res.status(422).json(err))
    },
    pullNotifications: function(req, res) {
        db.User
            .findOneAndUpdate(
                { _id: req.body.userId },
                { $pull: {notifications: { _id: req.body.messageid }} },
                { new: true}
            ).then(() => console.log("user messages removed"))
            .catch(err => res.status(422).json(err))
    }
};
