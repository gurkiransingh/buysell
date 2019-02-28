let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

let OrderSchema = new mongoose.Schema({
  items: [String],
  customerId: String,
  price: Number
});

OrderSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Order', OrderSchema);
