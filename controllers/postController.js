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
            .then(result => {
                console.log(result),
                res.json(result)
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
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            })

    }
    // ,
    // findOne: function(req, res) {
    //     db.Post
    //         .findOne(req.query)
    //         .then(result => {
    //             console.log(result);
    //             res.send(result);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.send(err);
    //         })
    // }

};