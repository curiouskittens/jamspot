const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/").get(userController.findAll);

router
  .route("/create")
  .get(userController.findOne)
  .post(userController.create);

router.route("/login").post(userController.login);

router.route("/home").get(userController.findOnePopulate);

router.route("/get/notification").get(userController.findOne);

router.route("/pull/notifications").put(userController.pullNotifications);

router.route("/profile").get(userController.findOne);

router
  .route("/:id")
  .put(userController.update)
  .delete(userController.remove);

router.route("/populated/:id").get(userController.findOnePopulate);

module.exports = router;
