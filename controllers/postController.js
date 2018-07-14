const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.Post
            .create({
                content: req.body.content,
                creator: req.body.creator,
            })
            .then(dbPost => {
                return db.Jam.findOneAndUpdate({ _id: req.body.jamId}, { $push: { posts: dbPost._id } }, { new: true });
            })
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
        db.Post
            .findOneAndUpdate(
                { _id: req.params.id},
                { $set: req.body },
                { new: true }
            )
            .then(result => {
                console.log(result),
                res.json(result)
            })
            .catch(dbPost => {
                console.log(dbPost)
                res.status(422).json(dbPost)
            })

    },
    findOne: function(req, res) {
        db.Post
            .findOne({ _id: req.params.id})
            .populate("creator")
            .then(dbPost => {
                console.log(dbPost);
                res.send(dbPost);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    },
    remove: function(req, res) {
        db.Post
            .findByIdAndRemove({ _id: req.params.id})
            .then(dbPost => {
                console.log(dbPost);
                res.send(dbPost);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    }

};