const router = require("express").Router();
const postController = require("../../controllers/postController");

router.route("/")
    .post(postController.create)

router.route("/:id")
    .put(postController.update)
    .get(postController.findOne)
    .delete(postController.remove)

module.exports = router;