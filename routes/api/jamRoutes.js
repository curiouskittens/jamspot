const router = require("express").Router();
const jamController = require("../../controllers/jamController");

router.route("/")
    .post(jamController.create)


router.route("/:id")
    .put(jamController.update)
    .get(jamController.findOne)



module.exports = router;