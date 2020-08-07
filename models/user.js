const mongoose = require("mongoose");
const passortLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({ // Schema
    username: String,
    password: String
});

UserSchema.plugin(passortLocalMongoose);

//  require 此 user.js 會 匯出 User model !
module.exports = mongoose.model("User", UserSchema); // model