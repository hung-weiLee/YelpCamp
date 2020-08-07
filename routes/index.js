const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


// root route
router.get("/", function(req, res){
    res.render("landing");
});


/********************* (AUTH ROUTES) *********************/

// show sign up form
router.get("/register", function(req, res){
    res.render("register");
});


// handling user sign up logic
router.post("/register", function(req, res){
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});


/********************* (LOGIN ROUTES) *********************/

// show login form
router.get("/login", function(req, res){
    res.render("login");
});


// handling login logic
//                  middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) , function(req, res){

});


/********************* (LOGOUT ROUTES) *********************/

// logout logic
router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});


module.exports = router;