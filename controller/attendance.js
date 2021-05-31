const Attendance = require('../models/attendance')

exports.userAttendance = (req,res,next) => {
    const {subjectId, studentId} = req.body
    return Attendance.findOne({
        subjectId: subjectId
    }).then(result => {
        if(result) {
            const now = new Date().getDate()
            console.log(now)
            var count = null
            for( let i = 0 ; i < result.studentsAttendance.length; i++) {
                console.log(result.studentsAttendance[i]['studentId'], studentId)
                if(result.studentsAttendance[i]['studentId'] === studentId) {
                   
                    count = i
                    break;
                }
            }
            if(count !== null) {
                const studentsAttendance = result.studentsAttendance
                studentsAttendance[count][now.toString()] = true
                result.studentsAttendance = studentsAttendance
                result.markModified('studentsAttendance')
                return result.save().then(resultAttendance => res.status(201).json({
                    message:'successful',
                    status:1
                }))
                .catch(err => {
                    return res.status(500).json({
                        message:'Something went wrong',
                        status:0
                    })
                })
            }
            return res.status(404).json({
                message:'Not found attendance',
                status: 0
            })
        }
        return res.status(404).json({
            message:'Not found attendance',
            status: 0
        })
    })
}