const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/create")
    .post(userController.create)
    .get(userController.findOne)


router.route("/:id")
    .put(userController.update)
    



module.exports = router;