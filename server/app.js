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
  SellOrder = require('./models/sellOrder'),
  LocalStrategy = require("passport-local"),
  path = require('path'),
  // fs = require('fs'),
  Sell = require('./models/sellOrder'),
  sgMail = require('@sendgrid/mail');


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
  let address = {
    zip: req.body.zip 
  }
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      defaultAddress: [address]
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

app.post('/addAddress', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    if (err) {console.log(err);}
    else {
      let address = {
        firstname: req.body.address.fName,
        lastname: req.body.address.lName,
        addr1: req.body.address.addr1,
        addr2: req.body.address.addr2,
        landmark: req.body.address.landmark,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip,
        default: false
      }
      if (foundUser.addresses.length === 0) {
        address['default'] = true;
      }
      foundUser.addresses.push(address);
      foundUser.save(function(err, updateduser) {
        if(err) {console.log(err);}
        else {
          res.json(updateduser.addresses);
        }
      })
    }
  })
});

app.post('/getDefaultAddress', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    let defaultAddress = foundUser.addresses.filter((addr) => addr.default === true);
    if(req.body.onlyDefault) {
      res.json(defaultAddress);
    } else {
      res.json(Object.assign(foundUser , {addresses: defaultAddress}));
    }
  })
})

app.post('/editAddress', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    if(err) {console.log(err)} 
    else {
      let newAddress = {
        firstname: req.body.address.fName,
        lastname: req.body.address.lName,
        landmark: req.body.address.landmark,
        addr1: req.body.address.addr1,
        addr2: req.body.address.addr2,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip,
        default: req.body.address.default 
      }
      foundUser.addresses[req.body.address.index] = newAddress;
  
      foundUser.save(function(err, user) {
        if(err) {console.log(err);} else {
          res.json(foundUser.addresses);
        }
      })
    }
  });
})

app.post('/makeDeafult', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {

    foundUser.addresses.map((v,i) => Object.assign(v, {default: false}));
    foundUser.addresses.map((v,i) => {
      if(i === req.body.index) {
        return Object.assign(v, {default: true})
      } else {
        return v;
      }
    })
    foundUser.save(function(err, user) {
      if(err) {console.log(err);} else {
        res.json(user.addresses);
      }
    })
  })
})

app.post('/getAddresses', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    if (req.body.exceptDefault) {
      let addresses = foundUser.addresses.filter((address) => address.default !== true);
      res.json(addresses);
    } else {
      res.json(foundUser.addresses);
    }
  })
})

app.post('/getUserDetails', function(req, res) {
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    res.json(foundUser);
  });
}); 

app.post('/createSellOrder', function(req, res) {
  let data = {
    custId: req.body.userId,
    thought: req.body.thought,
    data: req.body.data,
    current: true
  }
  let orderToMark;
  Sell.create(data, function(err, letsc) {
    if(err) {console.log(err);}
    else {
      User.findOne({_id: req.body.userId}, function(err, foundUser) {
        if(err) {console.log(err);}
        foundUser.sellOrders.push(letsc);
        foundUser.save(function(err, user) {
          if(err) {console.log(err);}
          else {
            if(foundUser.sellOrders.length-2 >= 0) {
              orderToMark = foundUser.sellOrders[foundUser.sellOrders.length-2];
            
              Sell.findOne({_id: orderToMark}, function(err, sellOrder) {
              if(err) {console.log(err);} else {
                sellOrder['current'] = false;
                res.json(letsc);
              }
              })
            } 
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
  let placedOn = [];
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    if (err) { console.log(err); }
    else {
      let length = foundUser.orders.length;
      foundUser.orders.map((order,i) => {
        Order.findOne({_id: order}, function(err, foundOrder) {
          if (err) {console.log(err);} else {
            placedOn.push(foundOrder.placedOn);
            if (i === length -1) {
              return res.json({ 
                orders: foundUser.orders,
                placedOn: placedOn
               })
            }
          }
        })
      })
    }
  })
})

app.post('/getOrderItems', function(req, res) {
  Order.findOne({_id: req.body.orderId}, function(err, foundOrder) {
    if(err) {console.log(err);} else {
      const promises = foundOrder.items.map(async itemId=> {
        let itemDetail = await Item.findOne({_id: itemId});
        return itemDetail;
      })
      const result = Promise.all(promises);
      result.then(result => {
        res.json({items: result, shippingAddress: foundOrder.shippingAddress, totalPrice: foundOrder.price});
      })
    }
    
  })
})

app.post('/getItemDetails', function(req, res) {
  let items = req.body.items;

  let promises = items.map(async item=> {
    let itemDetail = await Item.findOne({_id: item});
    return itemDetail;
  })

  const result = Promise.all(promises);
  result.then(result =>{
    res.json(result);
  });

})

app.post('/getSellOrderDetail', function(req, res) {
  let id = req.body.id;
  SellOrder.findOne({_id: id}, function(err, foundOrder) {
    if (err) {console.log(err);} else {
      res.send(foundOrder); 
    }
  })
})

app.post('/getPotentialReturnItems', function(req, res) {
  let items = [];
  User.findOne({_id: req.body.userId}, function(err, foundUser) {
    if (err) {console.log(err);} else {
      let promises = foundUser.orders.map(async order => {
        let orderDetail =  await Order.findOne({_id: order});
        return orderDetail
      })
      const result = Promise.all(promises);
      result.then(orders => {
        orders.map(order => {
          items = items.concat(order.items);
        })
        res.json(items);
      })
    }
  })
})


app.post('/markAsReturn', function(req, res) {
  let itemId = req.body.item;
  Item.findOne({_id: itemId}, function(err, foundItem) {
    foundItem.returned = true;
    foundItem.save(function(err, savedItem) {
      if(err) {console.log(err);} else {
        res.json(true);
      }
    })
  })
})

app.post('/makePayloadForPaytm', function(req, res) {
  let itemIds = [];
  req.body.items.map((v,i) => {
    itemIds.push(v._id);
  });
      Order.create({
        price: req.body.totalPrice,
        items: itemIds,
        placedOn: Date.now(),
        customer: req.body.custId,
        shippingAddress: req.body.shippingAddress
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
                    MOBILE_NO: '9417392969',
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
                    paramarray['CALLBACK_URL'] = `https://radiant-thicket-90721.herokuapp.com/responseFromPaytm/?custId=${req.body.custId}&orderId=${String(order._id)}&fromCart=${req.body.fromCart}&items=${itemIds}`;
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
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

app.post('/contactus', function(req, res) {
  sgMail.setApiKey('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');
  const msg = {
    to: req.body.data.sender,
    from: 'gukiece@gmail.com',
    subject: req.body.data.subject,
    text: req.body.data.text,
    html: `<p>${req.body.data.text}</p>`,
  };
  sgMail.send(msg)
    .then((rslt) => {
      res.send(rslt);
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


