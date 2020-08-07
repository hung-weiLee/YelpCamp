const express = require('express');
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");


/*-- INDEX ROUTE: show all campgrounds --*/
router.get("/", function(req, res){
    // console.log(req.user);
    // get all campgrounds from db yelp_camp !
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
}); 


/*-- CREATE ROUTE: add new campground to db --*/
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from the form that send from the frontend !
    const n = req.body.name;
    const m = req.body.image;
    const d = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    let new_campground = {  name: n, 
                            image: m, 
                            description: d,
                            author: author  };
    
    // create a new campground and save to db !
    Campground.create(new_campground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds"); /* res.redirect => default as GET request !!! */
        }
    });
});


/*-- NEW ROUTE: show form to frontend --*/
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new"); // 回傳 form 到 前端
});


/*-- SHOW ROUTE: show more information about one particular campground --*/
router.get("/:id", function(req, res){
    // find the campground with provided id, and then populate(填充) the Comment document into the comments array !
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


/*-- EDIT ROUTE --*/
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});


/*-- UPDATE ROUTE --*/
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + updatedCampground._id);
       }
    });
});


/*-- DESTROY ROUTE --*/
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
    });
 });


module.exports = router;