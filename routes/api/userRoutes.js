const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/create/:username?")
    .post(userController.create)
    .get(userController.findOne)


router.route("/:id")
    .put(userController.update)
    .get()



module.exports = router;