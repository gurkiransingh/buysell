/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
let express = require("express"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  Json = require('circular-json'),
  bodyParser = require("body-parser"),
  User = require("./models/user"),
  Order = require('./models/order'),
  Item = require('./models/item'),
  LocalStrategy = require("passport-local"),
  path = require('path'),
  // fs = require('fs'),
  Sell = require('./models/sellOrder');


let checksum = require('./checksum');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// let https = require('https');
// var privateKey = fs.readFileSync(path.join(__dirname + "/../https/key.pem"));
// var certificate = fs.readFileSync(path.join(__dirname + "/../https/cert.pem"));

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



app.use(
  require("express-session")({
    secret: "sandeep and gurkiran",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let port = process.env.PORT || 5001;
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

app.get('/haha', function(req, res) {
  console.log(req);
})

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

app.post('/createSellOrder', function(req, res) {
  let data = {
    custId: req.body.userId,
    thought: req.body.thought,
    data: req.body.data
  }

  Sell.create(data, function(err, letsc) {
    if(err) {console.log(err);}
    else {
      User.findOne({_id: req.body.userId}, function(err, foundUser) {
        if(err) {console.log(err);}
        foundUser.sellOrders.push(letsc);
        foundUser.save(function(err, user) {
          if(err) {console.log(err);}
          else {
            res.json(letsc);
          }
        })
      })
    }
  })
});

app.post('/getSellOrders', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    if(err) {console.log(err);}
    res.json(foundUser.sellOrders);
  })
});

app.post('/makePayloadForPaytm', function(req, res) {
  let fResult;
  let paramlist = {
    ORDER_ID: '8',
    CUST_ID: '2',
    MOBILE_NO: '9417392969',
    INDUSTRY_TYPE_ID: 'Retail',
    CHANNEL_ID: 'WEB',
    TXN_AMOUNT: '1',
    MID: 'AvXMpM68578606838453',
    WEBSITE: 'WEBSTAGING',
    PAYTM_MERCHANT_KEY: 'g1E6CnTz&1Hhc%dN'
  }
  var paramarray = new Array();
  for (name in paramlist)
        {
          if (name == 'PAYTM_MERCHANT_KEY') {
               var PAYTM_MERCHANT_KEY = paramlist[name] ; 
            }else
            {
            paramarray[name] = paramlist[name] ;
            }
        }
        paramarray['CALLBACK_URL'] = 'https://radiant-thicket-90721.herokuapp.com/responseFromPaytm';
        checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function(result){
          let obj = { }
          for (var key in result) {
            obj[key] = result[key]
          }
          res.json(obj);
        })
})

app.post('/responseFromPaytm',function(req, res) {
  console.log('in response api');
  var paramlist = req.body;
  console.log(paramlist);
  if(checksum.verifychecksum(paramlist, 'g1E6CnTz&1Hhc%dN'))
  {
    console.log("true");
    res.render('success.ejs',{ 'restdata' : "true" ,'paramlist' : paramlist});
  }else
  {
     console.log("false");
     res.render('failure.ejs',{ 'restdata' : "false" , 'paramlist' : paramlist});
  };
})

app.get('/goToSPA', function(req, res) {
  console.log('here');
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});


app.listen(port, () => console.log(`Example app listening on port 5000!`));