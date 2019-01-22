let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  email: String,
  dob: String,
  gender: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
