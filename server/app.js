/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
let express = require("express"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  User = require("./models/user"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.use(passport.initialize());

mongoose.connect(
  "mongodb://gurkiran:Eldorado1@ds163354.mlab.com:63354/playground"
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  require("express-session")({
    secret: "sandeep and gurkiran",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.session());

const port = 3000;

// eslint-disable-next-line no-unused-vars

app.post("/register", function(req, res) {
  User.register(
    new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      username: req.body.username
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        res.end("oops! ");
      }
      passport.authenticate("local")(req, res, function() {
        res.json(user);
      });
    }
  );
});

app.post("/login", passport.authenticate("local"), function(req, res) {
  let user = User.find({ username: req.body.username }, function(err, user) {
    if (err) res.end(err);
    res.json(user);
  });
});

app.get("/profile", isLoggedIn, function(req, res) {
  res.send("Weclome !");
});

app.get("/logout", function(req, res) {
  req.logOut();
  res.send("out");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.end("Login first !");
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
