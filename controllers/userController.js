const db = require("../models");

module.exports = {
    create: (newUser, options) => db.User.create(newUser, options),
    update: (conditions, update, options) => db.User.findOneAndUpdate(conditions, update, options),
    findOne: (conditions, options) => db.User.findOne(conditions, options),
    findAll: () => db.User.find({}),
    remove: (conditions, options) => db.User.findOneAndDelete(conditions, options)
};
