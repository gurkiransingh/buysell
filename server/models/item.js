let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

let ItemSchema = new mongoose.Schema({
    name: String,
    desc: String,
    date_created: Date,
    pics: [String],
    size: [String],
    price: Number,
})

ItemSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Item', ItemSchema);