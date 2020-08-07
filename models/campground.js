const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({ // Schema
    name: String,
    image: String,
    description: String,
    author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        username: String
     },
     comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
  });

//  require 此 campground.js 會 匯出 Campground model !
module.exports = mongoose.model("Campground", campgroundSchema); // model