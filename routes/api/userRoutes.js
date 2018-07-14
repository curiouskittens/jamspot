const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/create")
    .post(userController.create)
    .get(userController.findOne)

router.route("/login")
    .post(userController.login)

router.route("/:id")
    .put(userController.update)
    .get()



module.exports = router;