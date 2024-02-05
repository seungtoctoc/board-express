const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    writer: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model("new-Comment", commentSchema);

module.exports = Comment;