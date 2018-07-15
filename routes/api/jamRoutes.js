const router = require("express").Router();
const jamController = require("../../controllers/jamController");

router.route("/")
    .post((req, res, next) => {
        jamController.create(req.body)
            .then(dbJam => res.json(dbJam))
            .catch(err => res.status(422).json(err))
    })
    .get((req, res, next)=>{
        jamController.findAll()
            .then(dbAllJams => res.json(dbAllJams))
            .catch(err => res.json(err))
    })


router.route("/:id")
    .put((req, res, next) => {
        jamController.update(
            { _id: req.params.id},
            { $set: req.body },
            { new: true }
        )
            .then(dbJam => res.json(dbJam))
            .catch(err => res.status(422).json(err))
    })
    .get((req, res, next) => {
        jamController.findOne({ _id: req.params.id})
            .populate("admin")
            .populate("members")
            .populate("joinRequests")
            .populate("posts")
            .then(dbJam => res.json(dbJam))
            .catch(err => res.json(err))
    })
    .delete((req, res, next) => {
        jamController.remove({ _id: req.params.id})
            .then(dbJam => res.json(dbJam))
            .catch(err => res.json(err))
    })


module.exports = router;