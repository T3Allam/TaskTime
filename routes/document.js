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

router.get("/", function (req, res){
    res.render("new");
})


//Create Route
router.post("/", middleware.isLoggedIn, function (req, res){ 
    var startTime =  req.body.startTime
    var endTime = req.body.endTime
    var timeDifference = req.body.timeDifference
    var task = req.body.task;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newActivity = { author: author, todayDate: todayDate, startTime: startTime, endTime:endTime, timeDifference:timeDifference, task:task}
    Activity.create(newActivity, function(err, newlyCreated){
        if (err) {
            console.log(err)
        } else {
            req.flash("success", "Saved")
            res.redirect("/");
        }
    })
})


module.exports = router;