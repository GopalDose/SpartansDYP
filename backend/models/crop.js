const mongoose = require('mongoose');

const userCropSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Store as ObjectId
    acres: { type: Number, required: true },
    state: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const UserCrop = mongoose.model('UserCrop', userCropSchema);

module.exports = UserCrop;
