let mongoose = require("mongoose"),
  properties = require('./order');
  passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  email: String,
  pinCode: String,
  moneyEarned: Number,
  phone: Number,
  no_of_orders: Number,
  orders : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  cart_items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", UserSchema);

