const router = require("express").Router();
const userRoutes = require("./userRoutes");
// const jamRoutes = require("./jamRoutes");

// user routes
router.use("/users", userRoutes);
// router.use("/jams", jamRoutes);

module.exports = router;