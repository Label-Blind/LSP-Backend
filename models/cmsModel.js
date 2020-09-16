var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var Cms = new Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    subtitle: {
        type: String,
    },
    slug: {
        type: String,
        unique:true
    },
    description: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('cms',Cms)