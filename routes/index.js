var express = require("express");
var router = express.Router();

var CampGround = require("../models/campgrounds"),
    passport   = require("passport"),
    User       = require("../models/user"),
    Comment    = require("../models/comments");

router.get("/", function(req, res){
    res.render("landing");
});


/////////////////AUTH ROUTES \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

router.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res) {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log("error creating account:::" + err );
            return res.render("register");
        }
        passport.authenticate("local")(req, res ,function(){
            req.flash("success", "Welcome To CampChamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login",function(req, res) {
    res.render("login");
});

//passport injected as middleware to handle user login via session "passport.useLocalStrategy.authenticate()"
router.post("/login", passport.authenticate("local", 
            {
                successRedirect: "/campgrounds",
                failureRedirect: "/login"
            }), function(req, res) {

    
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged You Out");
    res.redirect("/");
})

// function isLoggedIn(req, res , next){
//     if( req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;
