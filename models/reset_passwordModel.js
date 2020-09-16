var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var ResetPassword = new Schema({
    email: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: String,
    },
    
});

module.exports = mongoose.model('resetPassword',ResetPassword)