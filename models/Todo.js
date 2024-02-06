const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    writer: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    color: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;