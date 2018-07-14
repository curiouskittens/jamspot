const router = require("express").Router();
const jamController = require("../../controllers/jamController");

router.route("/")
    .post(jamController.create)
    .get(jamController.findAll)


router.route("/:id")
    .put(jamController.update)
    .get(jamController.findOne)
    .delete(jamController.remove)



module.exports = router;