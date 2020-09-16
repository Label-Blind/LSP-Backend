var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//Define a schema
var Schema = mongoose.Schema;
var Company = new Schema({
    company_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique:true,
        required: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid) {
                const self = this;
                return self.constructor.findOne({ email: value })
                .exec(function(err, user){
                    if(err){
                        throw err;
                    }
                    else if(user) {
                        if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
                            return isValid(true);
                        }
                        return isValid(false);  
                    }
                    else{
                        return isValid(true);
                    }

                })
            },
            message:  'The email address is already taken!'
        },
    },
    phone: {
        type: String,
        unique:true,
        required: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid) {
                const self = this;
                return self.constructor.findOne({ phone: value })
                .exec(function(err, user){
                    if(err){
                        throw err;
                    }
                    else if(user) {
                        if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
                            return isValid(true);
                        }
                        return isValid(false);  
                    }
                    else{
                        return isValid(true);
                    }

                })
            },
            message:  'Phone no is already taken!'
        },
    },
    password: {
        type: String,
        required: true
    },
    fssai_licence_no: {
        type: String,
        default: null
    },
    licence_type:{
        type:String,
        default: null
    },
    profile: {
        type : String,
        default: null
    },
    employee_size: {
        type:String,
        default: null
    },
    revenue:{
        type:String,
        default: null
    },
    retail_structure:{
        type:String,
        default: null
    },
    otp:{
        type:Number,
        required: true,
    },
    otpExpiry:{
        type: String,
        default:Date.now() + 300000
    },
    verified:{
        type:Boolean,
        required: true,
    },
    verificationToken:{
        type:String,
        default:null
    },
    // Mitra Fields
    name: {
        type:String,
        default:null,
    },
    fsm_registration_no: {
        type:String,
        default:null,
    },
    mitra_type: {
        type:String,
        default:null,
    },
    operator: {
        type:String,
        default:null,
    },
    created_at:{
        type:Date,
        default: Date.now,
    },
    last_visited:{
        type:Date,
        default: Date.now,
    }
});
Company.plugin(uniqueValidator);
module.exports = mongoose.model('company',Company)