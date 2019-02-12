let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

let OrderSchema = new mongoose.Schema({
    type : String,
    data : {
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }],
        customerId: Number,
        datePlaced: Date,
        price: Number
    }
});

OrderSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Order', OrderSchema);
