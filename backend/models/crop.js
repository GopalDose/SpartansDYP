const mongoose = require('mongoose')


const userCropSchema = new mongoose.Schema({
    name:{type:String},
    userid:{type:String},
    acres:{type:Numeric},
    createdAt:{type:Date}
}, { timestamps: true })

const UserCrop = mongoose.model('UserCrop',UserCrop)