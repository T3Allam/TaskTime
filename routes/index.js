var express = require("express")
var router = express.Router();
var passport = require("passport")
var User = require("../models/user")
var async = require("async");
// var nodemailer = require("nodemailer");
var crypto = require("crypto");
//========
// AUTH Routes 
// ========

//show register form
router.get("/register", function(req, res){
    res.render("register");
})

//handle sign up logic
router.post("/register", function(req, res){
   var newUser = new User (
      {
         username: req.body.username, 
         email: req.body.email,
      });
      User.register(newUser, req.body.password, function(err, user){
         if(err){
         //  console.log(err);
          return res.render("register", {error: err.message});
         }
         passport.authenticate("local")(req, res, function(){
         // req.flash("success", "Welcome to YelpCamp " + user.username)
         res.redirect("/")
      })
   });
});


//show login
router.get("/login", function(req, res){
    res.render("login", {page: "register"});
})

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/", 
        failureRedirect: "/login",
         failureFlash: true
    }), function(req, res){
})

//logout route
router.get("/logout", function(req, res){
   req.flash("success", "Logged Out")
    req.logout();
    res.redirect("/")
})

// forgot password
router.get("/forgot", function(req, res) {
    res.render("forgot");
})

router.post("/forgot", function(req, res, next){
   async.waterfall([
      function(done) {
         crypto.randomBytes(20, function(err, buf){
            var token = buf.toString('hex');
            done(err, token);
         })
      },
      function (token, done) {
         User.findOne({email: req.body.email}, function(err, user){
            if (!user) {
               req.flash("error", "No account with that email address exists.");
               return res.redirect("/forgot")
            }
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;
            
            user.save(function(err){
               done(err, token, user);
            });
         });
      },
      
      function(token, user, done) {
         var api_key = 'fa48ca55d83052b6337d031aa3f569f2-bd350f28-a1ff2d4d';
         var domain = 'sandboxf9e3de8fe26743bea1c67a97f7ba62d7.mailgun.org';
         var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
         var data = {
              from: 'Learning <learningtocode123456@gmail.com>',
              to: user.email,
              subject: "Node.js Password Reset",
              text: "Click on this link to reset password: http://" + req.headers.host + "/reset/" + token
             };
            mailgun.messages().send(data, function (error, body) {
               if (error){
                  console.log(error);
                  return res.redirect("back");
                  }
                  req.flash("success", "Please check your email. Password has been sent.")
              
                  console.log(body);
                  done(error, "done")
                  });
             }
      ], function (err){
         if (err) return next (err);
         res.redirect("/forgot")
      });
});

router.get("/reset/:token", function(req, res) {
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now()}}, function(err, user){
       if (!user) {
          req.flash("error", "Password reset token is invalid or has expired.");
          return res.redirect("/forgot");
       }
       res.render("reset", {token: req.params.token});
    }) 
})

router.post("/reset/:token", function(req, res) {
   async.waterfall([
      function(done) {
         User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now()}}, function(err, user){
            if (!user) {
               req.flash("error", "Password reset token is invalid or has expired.");
               return res.redirect("/forgot");
            }
            if (req.body.password === req.body.confirm) {
               user.setPassword(req.body.password, function(err){
                  user.resetPasswordToken = undefined;
                  user.resetPasswordExpires = undefined;
                  user.save(function(err){
                     req.logIn(user, function(err){
                        done(err,user);
                     });
                  });
               })
            } else {
               req.flash("error", "Passwords do not match");
               return res.redirect("back");
            }
         });
      },
      function(user, done) {
         var api_key = 'fa48ca55d83052b6337d031aa3f569f2-bd350f28-a1ff2d4d';
         var domain = 'sandboxf9e3de8fe26743bea1c67a97f7ba62d7.mailgun.org';
         var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
         var data = {
              from: 'Learning <learningtocode123456@gmail.com>',
              to: user.email,
              subject: "Node.js Password has been changed",
              text: "Thisis a confirmation that the password for your account:" + user.email + "has just been reset"
             };
            mailgun.messages().send(data, function (error, body) {
               if (error){
                  console.log(error);
                  return res.redirect("back");
                  }
                  req.flash("success", "Success! Your password has been changed")
                  console.log(body);
                  done(error)
                  });
         }
      ], function (err){
         if (err) {
            console.log(err)
            return res.redirect("back")
         }
         res.redirect("/")
      });
});

module.exports = router;