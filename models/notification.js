
const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    title: String,
    content: String,
    teacherId: String,
    subjectId: String
}, {
    timestamps: true
});
module.exports =  mongoose.model('Notification', notificationSchema);