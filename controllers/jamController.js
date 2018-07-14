const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.Jam
            .create(
                // {
                // name: req.body.name,
                // location: req.body.location,
                // date: req.body.date,
                // creator: req.body.creator,
                // admins: req.body.admins
                // }
                req.body
            )
            .then(dbJam => {
                console.log(dbJam),
                res.json(dbJam)
            })
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            })
    },
    update: function(req, res) {
        db.Jam
            .findOneAndUpdate(
                { _id: req.params.id},
                { $set: req.body },
                { new: true }
            )
            .then(dbJam => {
                console.log(dbJam),
                res.json(dbJam)
            })
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            })

    },
    findOne: function(req, res) {
        db.Jam
            .findOne({ _id: req.params.id})
            .populate("creator")
            .populate("admins")
            .populate("members")
            .populate("joinRequests")
            .populate("posts")
            .then(dbJam => {
                console.log(dbJam);
                res.send(dbJam);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    findAll: function(req, res) {
        db.Jam
            .find({})
            .then(dbAllJams => {
                console.log(dbAllJams);
                res.send(dbAllJams);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    remove: function(req, res) {
        db.Jam
            .findByIdAndRemove({ _id: req.params.id})
            .then(dbJam => {
                console.log(dbJam);
                res.send(dbJam);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    }

};
