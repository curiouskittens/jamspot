const db = require("../models");

module.exports = {
  create: function(req, res) {
    db.Jam.create(req.body)
      .then(dbJam => {
        db.User.findOneAndUpdate(
          { _id: req.body.admin },
          { $push: { jams: dbJam._id } },
          { new: true }
        ).then(() => res.status(200).json(dbJam));
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Jam.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then(dbJam => res.json(dbJam))
      .catch(err => res.status(422).json(err));
  },
  findOne: function(req, res) {
    db.Jam.findOne({ _id: req.params.id })
      .populate({ path: "admin", select: "-password" })
      .populate({ path: "members", select: "-password" })
      .populate({ path: "joinRequests", select: "-password" })
      // .populate("posts")
      .populate({
        path: "posts",
        populate: { path: "creator", select: "-password" }
      })
      .then(dbJam => res.send(dbJam))
      .catch(err => res.send(err));
  },
  findAll: function(req, res) {
    db.Jam.find({})
      .populate("admin")
      .then(dbAllJams => res.send(dbAllJams))
      .catch(err => res.send(err));
  },
  remove: function(req, res) {
    db.Jam.findByIdAndRemove({ _id: req.params.id })
      .then(dbJam => res.send(dbJam))
      .catch(err => res.send(err));
  },
  joinRequest: function(req, res) {
    db.Jam.findOneAndUpdate(
      { _id: req.body.jamId },
      { $push: { joinRequests: req.body.userId } },
      { new: true }
    )
      .then(dbJam => {
        res.json(dbJam);
        const joinRequestMessage = {
          jamId: dbJam._id,
          jamName: dbJam.name,
          messageType: "joinRequest"
        };
        const jamAdminId = dbJam.admin;
        db.User.findOneAndUpdate(
          { _id: jamAdminId },
          { $push: { notifications: joinRequestMessage } },
          { new: true }
        ).then(() => {
          console.log("join request message sent.");
        });
      })
      .catch(err => res.status(422).json(err));
  },
  acceptJoinRequest: function(req, res) {
    db.Jam.findOneAndUpdate(
      { _id: req.body.jamId },
      {
        $pull: { joinRequests: req.body.userId },
        $push: { members: req.body.userId }
      },
      { new: true }
    )
      .then(dbJam => {
        const acceptedMessage = {
          jamId: dbJam._id,
          jamName: dbJam.name,
          messageType: "accepted"
        };
        db.User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { jams: dbJam._id, notifications: acceptedMessage } },
          { new: true }
        ).then(() => {
          console.log("jam added to user");
        });
      })
      .catch(err => res.status(422).json(err));
  },
  declineJoinRequest: function(req, res) {
    db.Jam.findOneAndUpdate(
      { _id: req.body.jamId },
      {
        $pull: { joinRequests: req.body.userId }
      },
      { new: true }
    )
      .then(dbJam => {
        const rejectedMessage = {
          jamName: dbJam.name,
          messageType: "rejected"
        };
        db.User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { notifications: rejectedMessage } },
          { new: true }
        ).then(() => console.log("user removed from join request"));
      })
      .catch(err => res.status(422).json(err));
  }
};
