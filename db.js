const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sarthak:zQEZc8hHZIXokKpc@cluster0.ab2zrms.mongodb.net/posts");

const postSchema = new mongoose.Schema({
    userId : String,
    postImageUrl : String,
    caption : String,
    likes : Number,
    comments : [
        {
            commentId : String,
            userId:String,
            text:String
        }
    ],
    taggedPeopleId: [String],
    createdAt : Number,
    updatedAt : Number
})

let postMongo = mongoose.model("Post",postSchema);

module.exports = postMongo;


