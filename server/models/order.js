let mongoose = require("mongoose");

let OrderSchema = new mongoose.Schema({
  items: [String],
  price: Number
});

module.exports = mongoose.model('Order', OrderSchema);
