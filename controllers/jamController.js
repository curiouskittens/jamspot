const db = require("../models");

module.exports = {
    create: (newjam, options) => db.Jam.create(newjam, options),
    update: (conditions, update, options) => db.Jam.findOneAndUpdate(conditions, update, options),
    findOne: (conditions, options) => db.Jam.findOne(conditions, options),
    findAll: () => db.Jam.find({}),
    remove: (conditions, options) => db.Jam.findOneAndDelete(conditions, options)
};
