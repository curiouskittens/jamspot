const db = require("../models");

module.exports = {
    create: function(req, res) {
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email
        }
        db.User
            .create(newUser)
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

    }

};
