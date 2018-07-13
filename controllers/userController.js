const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.User
            .create({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                email: req.body.email
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
        db.User
            .findOneAndUpdate(
                { _id: req.params.id},
                { $set: req.body },
                { new: true }

            ).then(result => {
                console.log(result),
                res.json(result)
            })
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            })

    },
    findOne: function(req, res) {
        db.User
            .findOne({
                username: req.query.username
             })
            .then(result => {
                console.log(result);
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    }

};
