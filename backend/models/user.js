const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: Number, required: true },
    password: { type: String, required: true, unique: true },
    state:{type:String,required:false,unique:false},
    district:{type:String,required:false},
    taluka:{type:String,required:false},
    pincode:{type:Number,required:false},
    adhaarno:{type:Number,required:false,unique:true},
    panno:{type:String,required:false,unique:true},
    createdAt:{type:Date,required:false},
    updatedAt:{type:Date,required:false}

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
