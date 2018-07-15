const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
    .get(userController.findAll)

router.route("/create")
    .post(userController.create)
    .get(userController.findOne)

router.route("/:id")
    .put(userController.update)
    .delete(userController.remove)

router.route("/populated/:id")
    .get(userController.findOnePopulate)

module.exports = router;