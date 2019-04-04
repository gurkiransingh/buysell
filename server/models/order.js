let mongoose = require("mongoose");

let OrderSchema = new mongoose.Schema({
  items: [String],
  price: Number,
  placedOn: Date,
  customer: String,
  shippingAddress: [{
    addr1: String,
    addr2: String,
    city: String, 
    default: Boolean,
    firstname: String,
    lastname: String,
    landmark: String,
    state: String,
    zip: String
  }]
});

module.exports = mongoose.model('Order', OrderSchema);
