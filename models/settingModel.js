var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var Setting = new Schema({
    about_us: {
        type: String,
    },
    privacy_policy: {
        type: String,
    },
    terms_and_conditions: {
        type: String,
    },
});

module.exports = mongoose.model('setting',Setting)