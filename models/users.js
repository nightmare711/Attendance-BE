
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:  {
        type: String,
    }, 
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },
    isTeacher: {
        type: Boolean,
    },
    dateOfBirth: { type: Date, default: Date.now },
    phoneNumber: {
        type: String,
    },
    imgUrl: {
        type: String, 
    }
}, {
    timestamps: true
});
module.exports =  mongoose.model('Users', userSchema);