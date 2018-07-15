const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
    .get((req, res, next) => {
        userController.findAll()
            .then(dbAllUsers => res.json(dbAllUsers))
            .catch(err => res.json(err))
    })

router.route("/create")
    .post((req, res, next) => {
        userController.create(req.body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err))
    })
    .get((req, res, next) => {
        userController.findOne(req.query)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err))
    })

router.route("/login")
    .post((req, res, next) => {
        userController.findOne({ username: req.body.username})
            .then(dbUser => {
                dbUser.validatePassword(req.body.password, function(err, isMatch) {
                    if (err) throw err;
                    res.json(isMatch);
                })
            })
            .catch(err => res.status(422).json(err))
    })

router.route("/:id")
    .put((req, res, next) => {
        userController.update(
            { _id: req.params.id},
            { $set: req.body },
            { new: true }
        )
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err))
    })
    .delete((req, res, next) => {
        userController.remove({ _id: req.params.id})
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err))
    })

router.route("/populated/:id")
    .get((req, res, next) => {
        userController.findOne({ _id: req.params.id})
            .populate("jams")
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err))
    })


module.exports = router;