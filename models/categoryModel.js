var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var Category = new Schema({
    code: {
        type: String,
    },
    name: {
        type: String,
    },
    parent: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model('category',Category)