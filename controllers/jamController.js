const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.Jam
            .create(req.body)
            .then(dbJam => {
                console.log("jam created!")
                res.json(dbJam)
                db.User.findOneAndUpdate(
                    { _id: req.body.admin},
                    { $push: { jams: dbJam._id } },
                    { new: true }
                ).then(() => console.log("jam added to user"))
            })
            .catch(err => res.status(422).json(err))
    },
    update: function(req, res) {
        db.Jam
            .findOneAndUpdate(
                { _id: req.params.id},
                { $set: req.body },
                { new: true }
            )
            .then(dbJam => res.json(dbJam))
            .catch(err => res.status(422).json(err))

    },
    findOne: function(req, res) {
        db.Jam
            .findOne({ _id: req.params.id})
            .populate("admin")
            .populate("members")
            .populate("joinRequests")
            .populate("posts")
            .then(dbJam => res.send(dbJam))
            .catch(err => res.send(err))
    },
    findAll: function(req, res) {
        db.Jam
            .find({})
            .then(dbAllJams => res.send(dbAllJams))
            .catch(err => res.send(err))
    },
    remove: function(req, res) {
        db.Jam
            .findByIdAndRemove({ _id: req.params.id})
            .then(dbJam => res.send(dbJam))
            .catch(err => res.send(err))
    },
    joinRequest: function(req, res){
        console.log("join request controller method hit")
        db.Jam
            .findOneAndUpdate(
                { _id: req.body.jamId},
                { $push: { joinRequests: req.body.userId } },
                { new: true }
            )
            .then(dbJam => res.json(dbJam))
            .catch(err => res.status(422).json(err))
    },
    acceptJoinRequest: function(req,res){
        db.Jam
            .findOneAndUpdate(
                { _id: req.body.jamId},
                { 
                    $pull: { joinRequests: req.body.userId },
                    $push: { members: req.body.userId }
                },
                { new: true }
            )
            .then(dbJam => {
                db.User.findOneAndUpdate(
                    { _id: req.body.userId},
                    { $push: { jams: dbJam._id } },
                    { new: true }
                ).then(() => console.log("jam added to user"))
            })
            .catch(err => res.status(422).json(err))
    }
};
