
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    isTeacher: {
        type: Boolean,
        required: true
    },
    dateOfBirth: { type: Date, default: Date.now },
    phoneNumber: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String, 
        required:true
    }
}, {
    timestamps: true
});
module.exports =  mongoose.model('Users', userSchema);