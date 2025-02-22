const mongoose = require("mongoose")

const Task = mongoose.Schema({
    type:{type:String,required:true},
    name:{type:String,required:true},
    summary:{type:String,required:true},
    price:{type:Number},
    cropid:{type:String},
    quantity:{type:Number},
    companyname:{type:String},
    createdAt:{type:Date,required:false},
    updatedAt:{type:Date,required:false}
},{timestamps:true});

const UserTask = mongoose.model('UserTask',Task)

module.exports  = UserTask