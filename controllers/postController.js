const db = require("../models");

module.exports = {
    create: (newPost, jamId) => {
        console.log("testing: inside post create")
        db.Post.create(newPost)
            .then(dbPost => {
                console.log("testing: inside post create then statement")
                return db.Jam.findOneAndUpdate(
                    { _id: jamId}, 
                    { $push: { posts: dbPost._id } }, 
                    { new: true }
                )
            })
            .then(dbJam => res.json(dbJam))
            .catch(err => res.status(422).json(err))
    },
    update: (conditions, update, options) => db.Post.findOneAndUpdate(conditions, update, options),
    findOne: (conditions, options) => db.Post.findOne(conditions, options),
    remove: (conditions, options) => db.Post.findOneAndDelete(conditions, options)
};