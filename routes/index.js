const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");

module.exports = passport => {
  router.use("/api", apiRoutes);
  router.use("/auth", authRoutes(passport));

  return router;
}