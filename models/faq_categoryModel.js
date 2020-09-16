var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var Faq_Category = new Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('faq_category',Faq_Category)