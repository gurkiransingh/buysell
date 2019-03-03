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
  "mongodb://gurkiran:Eldorado1@ds155845.mlab.com:55845/playground"
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

// Item.create({
//   type: 'Denim',
//   name: 'Hipster 2',
//   desc: 'A description',
//   pic: 'https://picsum.photos/201/302',
//   size: ['M'],
//   price: 800,
//   archived: false

// }, function(err, item) {
//   console.log(item);
// })

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

app.post('/getOrders', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    if (err) { console.log(err); }
    else {
      res.json(foundUser.orders);
    }
  })
})

app.post('/makePayloadForPaytm', function(req, res) {
  let itemIds = [];
  req.body.items.map((v,i) => {
    itemIds.push(v._id);
  });
      Order.create({
        price: '500',
        items: itemIds
      }, function(err, order) {
        if(err) { console.log(err);  res.end('oops'); }
        else {
          User.findOne({_id: req.body.custId}, function(err, foundUser) {
            if (err) {console.log(err);}
            else {
              foundUser.orders.push(order);
              foundUser.save(function(err, user) {
                if (err) {console.log(err);}
                else {
                  let paramlist = {
                    ORDER_ID: String(order._id),
                    CUST_ID: req.body.custId,
                    MOBILE_NO: '1234567890',
                    INDUSTRY_TYPE_ID: 'Retail',
                    CHANNEL_ID: 'WEB',
                    TXN_AMOUNT: '500',
                    MID: 'AvXMpM68578606838453',
                    WEBSITE: 'WEBSTAGING',
                    PAYTM_MERCHANT_KEY: 'g1E6CnTz&1Hhc%dN'
                  }
                  var paramarray = new Array();
                  for (name in paramlist) {
                    if (name == 'PAYTM_MERCHANT_KEY') {
                          var PAYTM_MERCHANT_KEY = paramlist[name] ; 
                      } else {
                      paramarray[name] = paramlist[name] ;
                      }
                    }
                    paramarray['CALLBACK_URL'] = `http://localhost:5000/responseFromPaytm/?custId=${req.body.custId}&orderId=${String(order._id)}&fromCart=${req.body.fromCart}&items=${itemIds}`;
                    checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function(result){
                      let obj = { }
                      for (var key in result) {
                        obj[key] = result[key]
                      }
                      res.json(obj);
                    })
                }
              })
            }
          })
        }
      })
    });


app.post('/responseFromPaytm/',function(req, res) {
  // console.log('jasbdkjabskda', req, req.query);
  let custId = req.query.custId,
      orderId = req.query.orderId,
      fromCart = req.query.fromCart,
      items = req.query.items;

  items = items.split(',');

// console.log(req.body.RESPMSG.includes('suc'));
  console.log('in response api');
  var paramlist = req.body;
  // console.log(paramlist);
  if(checksum.verifychecksum(paramlist, 'g1E6CnTz&1Hhc%dN')) {
    if(req.body.RESPMSG.includes('ccess')) {
      if (fromCart = 'true') { // check if its from cart 
        User.findOne({_id: custId}, function(err, foundUser) { 
          if (err) {console.log(err);}
          else {
            foundUser.cart_items = []; // delete all cart items from that user
            foundUser.save(function(err, user) {
              if(err) {console.log(err);}
            })
          }
        })
      }
      items.map(function(id, index) { // Mark those items as archived ( bought )
        Item.findOne({_id: id}, function(err, foundItem) {
          foundItem.archived = true;
          foundItem.save(function(err, item) {
            if(err) {console.log(err);}
            else {
              if(index === items.length-1)
              console.log(index, items.length-1);
               return res.render('success.ejs',{ 'restdata' : "true" ,'paramlist' : paramlist});
            }
          })
        })
      })
    } else {
      Order.findByIdAndDelete({_id: orderId}, function(err) { // delete the order created as the transaction failed 
        if (err) {console.log('Order not deleted , oops! ')}
      })
      User.findOne({_id: custId}, function(err, foundUser) { // delete the order from user's profile 
        foundUser.orders.pop();
      })
      // no need to check if its from cart or not 
    }
  }else {
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


app.listen(5000, () => console.log(`Example app listening on port 5000!`));