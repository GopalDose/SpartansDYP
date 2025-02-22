const mongoose = require("mongoose")

const Task = mongoose.Schema({
    type:{String},
    name:{String},
    summary:{String},
    price:{Number},
    cropid:{String},
    quantity:{Number},
    companyname:{String},
    userid:{String},
    createdAt:{type:Date,required:false},
    updatedAt:{type:Date,required:false}
},{timestamps:true});

const UserTask = mongoose.model('UserTask',Task)

module.exports  = UserTask