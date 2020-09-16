var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var Faq = new Schema({
    category: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },    
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('faq',Faq)