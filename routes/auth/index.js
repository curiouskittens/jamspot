const router = require("express").Router();
const loginRoutes = require("./loginRoutes");

module.exports = passport => {
    router.use("/users", loginRoutes(passport));

    return router;
}