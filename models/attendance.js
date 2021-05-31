
const mongoose = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
    teacherId: String,
    subjectId: String,
    studentsAttendance: Array,
}, {
    timestamps: true
});
module.exports =  mongoose.model('Attendance', AttendanceSchema);