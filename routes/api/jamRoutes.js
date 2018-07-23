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

router.route("/join/:action")
    .put((req,res) => {
        switch (req.params.action){
            case "request": 
                jamController.joinRequest(req,res)
                break;
            case "accept":
                jamController.acceptJoinRequest(req,res)
                break;
            case "decline":
                jamController.declineJoinRequest(req,res)
                break;
        }
    })
    
router.route("/:id")
    .put(jamController.update)
    .get(jamController.findOne)
    .delete(jamController.remove)





module.exports = router;