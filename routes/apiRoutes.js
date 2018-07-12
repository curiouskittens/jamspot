// ============================================================================================
// DEPENDENCIES
// ============================================================================================
var path = require("path");
var db = require("../models");

// ============================================================================================
// ROUTES
// ============================================================================================
module.exports = function(app){
    app.post("/api/adduser", function(request, response){
        console.log(request.body.username,request.body.password, request.body.name,request.body.email )
        db.User.create({
            username: request.body.username,
            password: request.body.password,
            name: request.body.name,
            email: request.body.email
        })

        response.send(
            "it worked!!"
        )
    });

}