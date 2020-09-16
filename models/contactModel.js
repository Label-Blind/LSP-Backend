var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var Contact = new Schema({
    name: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },    
    phone: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    viewed: {
        type: Boolean,
        required: true
    },
    replied: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('contact',Contact)