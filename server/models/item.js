let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

let ItemSchema = new mongoose.Schema({
    type: String,
    name: String,
    desc: String,
    pic: String,
    size: [String],
    price: Number,
})

module.exports = mongoose.model('Item', ItemSchema);