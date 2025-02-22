const mongoose = require('mongoose')


const userCropSchema = new mongoose.Schema({
    name:{type:String},
    userid:{type:String},
    acres:{type:Number},
    state:{type:Boolean},
    createdAt:{type:Date}
}, { timestamps: true })

const UserCrop = mongoose.model('UserCrop',userCropSchema)

module.exports = UserCrop;
