let mongoose = require("mongoose");

let SellOrderSchema = new mongoose.Schema({
    number_of_clothes : Number,
    custId: String,
    thought: Number,
    got: Number,
    data: [{clothType: String,  quantity: Number}],
    current: Boolean
})

module.exports = mongoose.model('sellOrder', SellOrderSchema);