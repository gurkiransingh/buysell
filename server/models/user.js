let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  moneyEarned: Number,
  no_of_orders: Number,
  firstname: String,
  lastname: String,
  phone: Number,
  addresses: [{
    firstname: String,
    lastname: String,
    addr1: String,
    addr2: String,
    landmark: String,
    city: String,
    state: String,
    zip: String,
    phone: Number,
    default: Boolean
  }],
  orders : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  sellOrders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sellOrder'
  }],
  cart_items: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  purchasedItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", UserSchema);

