var express = require("express"),
    app = express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    Activity=require("./models/activity"),
    User=require("./models/user"),
    flash=require("connect-flash")
    // seedDB=require("./seed")
    

var documentRoutes = require("./routes/document"),
    archiveRoutes  = require("./routes/archive"),
    indexRoutes    = require("./routes/index")

// seedDB();
mongoose.connect("mongodb://localhost:27017/time", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static("public"));
app.set("view engine", "ejs")
app.use(flash());

//Passport Configuration
app.use(require("express-session")({
    secret: "hello",
    resave: false, 
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(indexRoutes);
app.use(archiveRoutes);
app.use(documentRoutes)


app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
  });