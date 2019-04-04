let mongoose = require("mongoose");

let ItemSchema = new mongoose.Schema({
    type: String,
    name: String,
    desc: String,
    pic: String,
    size: [String],
    price: Number,
    returned: Boolean,
    archived: {
      type: Boolean,
      default: false
    }
})

module.exports = mongoose.model('Item', ItemSchema);