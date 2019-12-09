var express = require("express")
var router = express.Router();
var Activity =require("../models/activity")
var middleware = require("../middleware")

var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var date = new Date();
var y = date.getFullYear();
var d = date.getDate();
var m = shortMonths[(date.getMonth())];
var todayDate = m + " " + d + ", " + y;

//INDEX - show all activities
router.get("/activities", middleware.isLoggedIn, function (req, res){
    var user = req.user._id;
    Activity.find({todayDate:todayDate, "author.id":user}, function (err, allactivities){
        if (err){
            console.log(err)   
        } else {
            var flag = true;
            // req.flash("success", "This is what you did today!")
            res.render("index", {flag: flag})
        }
    })
})

//INDEX - show all activities
router.post("/activities", middleware.isLoggedIn, function(req, res){
    var user = req.user._id;
    var mo = req.body.month;
    var da = req.body.day;
    var ye = req.body.year;
    var query = mo + " " + da + ", " + ye;
    var flag = false;
    Activity.find({todayDate: query, "author.id":user}, function (err, allactivities){
        if (err){
            console.log(err)   
        } else {
            // req.flash("success", "This is what you did on " + query)
            res.render("index", {activities: allactivities, flag: flag})
        }
    })
})



module.exports = router;