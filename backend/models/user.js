const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: Number, required: true },
    password: { type: String, required: true ,sparse:true},
    name : {type:String,required:false,unique:false},
    state:{type:String,required:false,default:null},
    district:{type:String,required:false,default:null},
    taluka:{type:String,required:false,default:null},
    pincode:{type:Number,required:false,default:null},
    adhaarno:{type:Number,required:false,sparse:true},
    panno:{type:String,required:false},
    createdAt:{type:Date,required:false},
    updatedAt:{type:Date,required:false}

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
