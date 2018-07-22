const router = require("express").Router();
const jamController = require("../../controllers/jamController");

router.route("/")
    .post(jamController.create)
    .get(jamController.findAll)

router.route("/test")
    .post((req, res)=>{
        console.log(req.body)
        res.json(req.body)
    })

router.route("/join")
    .post(jamController.joinRequest)

router.route("/join/accept")
    .put(jamController.acceptJoinRequest)
router.route("/join/decline")
    .put(jamController.declineJoinRequest)
    
router.route("/:id")
    .put(jamController.update)
    .get(jamController.findOne)
    .delete(jamController.remove)





module.exports = router;