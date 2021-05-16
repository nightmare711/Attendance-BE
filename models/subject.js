
const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
    }, 
    date: {
        type: Array,
        required: true
    },
    studentsId: {
        type: Array,
        required:true
    },
    time: { type: Array, required:true },
    attendanceTime: {
        type: Array, 
        required:true,
    },
    teacherId: {
        type: String,
        required:true
    }
}, {
    timestamps: true
});
module.exports =  mongoose.model('Subject', subjectSchema);