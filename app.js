const express               = require('express'),
      app                   = express(),
      port                  = process.env.port || 3000,
      mongoose              = require('mongoose'),
      bodyParser            = require("body-parser"),
      methodOverride        = require("method-override"),
      flash                 = require("connect-flash");
      Campground            = require("./models/campground"), 
      Comment               = require("./models/comment"), 
      seedDB                = require("./seeds"), 
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passortLocalMongoose  = require("passport-local-mongoose");
      User                  = require("./models/user");

// requiring Routes
const commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

mongoose.connect('mongodb://localhost:27017/yelp_camp_vDeployed', { // connect to db yelp_camp_vDeployed !!!
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


//seedDB();


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

// middleware
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


/*************************************************************/

// Tell Express to listen for request (start server) !!!
app.listen(port, function() { 
    console.log('Server listening on port 3000'); 
  });