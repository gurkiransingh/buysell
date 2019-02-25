let mongoose = require("mongoose");

let SellOrderSchema = new mongoose.Schema({
    number_of_clothes : Number,
    custId: String,
    thought: Number,
    got: Number,
    data: [{clothType: String,  quantity: Number}]
})

module.exports = mongoose.model('sellOrder', SellOrderSchema);