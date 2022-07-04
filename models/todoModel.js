const mongoose = require("mongoose");

const user_todo = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "enter a task name to do."]
    }
});

const User_data = mongoose.model("user_todos", user_todo);
module.exports = User_data;