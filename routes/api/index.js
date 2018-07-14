const router = require("express").Router();
const userRoutes = require("./userRoutes");
const jamRoutes = require("./jamRoutes");
const postRoutes = require("./postRoutes");

router.use("/users", userRoutes);
router.use("/jams", jamRoutes);
router.use("/posts", postRoutes);

module.exports = router;