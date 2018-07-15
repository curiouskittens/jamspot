const router = require("express").Router();
const postController = require("../../controllers/postController");

router.route("/")
    .post((req, res, next) => {
        postController.create(
            {
                content: req.body.content,
                creator: req.body.creator
            },
            req.body.jamId
        )
        .then(dbJam => {
            console.log("back in post routes")
            res.json(dbJam)})
        .catch(err => res.status(422).json(err))
        
    })


router.route("/:id")
    .put((req, res, next) => {
        postController.update(
            { _id: req.params.id},
            { $set: req.body },
            { new: true }
        )
        .then(result => res.json(result))
        .catch(dbPost => res.status(422).json(dbPost))
    })
    .get((req, res, next) => {
        postController.findOne({ _id: req.params.id})
            .populate("creator")
            .then(dbPost => res.json(dbPost))
            .catch(err => res.json(err))
    })
    .delete((req, res, next) =>{
        postController.remove({ _id: req.params.id})
            .then(dbPost => res.json(dbPost))
            .catch(err => res.json(err))
    })



module.exports = router;