const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todoItemSchema = new Schema({

    title: String,
    description:String,
});

module.exports = mongoose.model('todoItem',todoItemSchema, "todoItems");