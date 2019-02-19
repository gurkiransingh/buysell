/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
let express = require("express"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  User = require("./models/user"),
  Order = require('./models/order'),
  Item = require('./models/item'),
  LocalStrategy = require("passport-local"),
  path = require('path');
const app = express();
app.use(passport.initialize());

mongoose.connect(
  "mongodb://gurkiran:Eldorado1@ds223015.mlab.com:23015/playground"
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "/../dist")));

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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

// eslint-disable-next-line no-unused-vars

app.post("/register", function(req, res) {
  User.register(
    new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      pinCode: req.body.pinCode,
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

app.get("/logout", function(req, res) {
  req.logOut();
  res.send("out");
});

app.get('/getAllItems', function(req, res) {
  Item.find({}, function(err, items) {
    res.json(items);
  })
})

app.post('/pushtocart', function(req, res) {
  User.findOne({_id: req.body.custId}, function(err, foundUser) {
    if(err) {
      console.log(err);
    } else {
      if (foundUser.cart_items.indexOf(req.body.itemId) === -1) {
        foundUser.cart_items.push(req.body.itemId);
        foundUser.save(function(err, user) {
          if (err) { console.log(err); }
          else {
            res.json(true);
          }
        })
      } else {
        res.json(false)
      }
    }
  })
});

app.post('/getCartItems', function(req, res) {
  User.findOne({_id: req.body.custId}, function(err, foundUser) {
    if (err) { console.log(err); }
    else {
      Item.find({_id : { $in: foundUser.cart_items}}, function(err, items) {
        if (err) {console.log(err);}
        else {
          res.json(items);
        }
      });
    }
  })
})

app.post('/deleteItemFromCart', function(req, res) {
  User.findOne({_id: req.body.custId}, function(err, foundUser) {
    if (err) {console.log(err);}
    else {
      let index = foundUser.cart_items.indexOf(req.body.itemId);
      foundUser.cart_items.splice(index, 1);
      foundUser.save(function(err, user) {
        res.json(true);
      })
    }
  })
})

app.post('/changePersonalChanges', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    if (err) {console.log(err);}
    else {
      Object.assign(foundUser, {
        firstname: req.body.personal.firstName,
        lastname: req.body.personal.lastName,
        email: req.body.personal.email,
        phone: req.body.personal.number
      });
      foundUser.save(function(err, updateduser) {
        if(err) {console.log(err);}
        else {
          res.json(updateduser);
        }
      })
    }
  })
});

app.post('/changeAddressChanges', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    if (err) {console.log(err);}
    else {
      Object.assign(foundUser, {
        addr1: req.body.address.addr1,
        addr2: req.body.address.addr2,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip
      });
      foundUser.save(function(err, updateduser) {
        if(err) {console.log(err);}
        else {
          res.json(updateduser);
        }
      })
    }
  })
});

app.post('/getUserDetails', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    res.json(foundUser);
  });
}); 

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
