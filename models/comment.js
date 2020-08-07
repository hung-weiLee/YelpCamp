const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({ // Schema
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String 
    }
});

//  require 此 comment.js 會 匯出 Comment model !
module.exports = mongoose.model("Comment", commentSchema); // model