var mongoose = require("mongoose");
var Activity = require("./models/activity")
var User = require("./models/user")

function seedDB(){
    
    Activity.remove({}, function(err){
       if (err){
           console.log(err)
       } else {
        console.log("removed everything!");
       }
    });
    User.remove({}, function (err){
       if (err){
           console.log(err)
       } else {
        console.log("removed users!");
       }
    });

}

module.exports = seedDB;