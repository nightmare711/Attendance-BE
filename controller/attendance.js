const Attendance = require('../models/attendance')
const User = require('../models/users')

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
    }).catch(err => res.status(500).json({
        message:'Something went wrong',
        status: 0
    }))
}
exports.getAttendanceBySubjectId = (req,res,next) => {
    const subjectId = req.params.subjectId
    return Attendance.findOne({
        subjectId: subjectId
    }).then(async(result) => {
        console.log(subjectId)
        if(result) {
            const attendanceWithInfo = []
            for(let i = 0;  i < result.studentsAttendance.length; i+=1) {
                const studentInfo = await User.find({
                    studentId: result.studentsAttendance[i]['studentId'],
                    isTeacher:false
                })
                if(studentInfo) {
                    const attendance = []
                    
                    for(let j = 0; j < 30; j++) {
                        
                        attendance.push(result.studentsAttendance[i][j.toString()])
                    }
                    
                    attendanceWithInfo.push({
                        attendance: attendance,
                        studentInfo: studentInfo
                    })
                }
            }
            return res.status(200).json({
                message:'successful',
                status: 1,
                result: attendanceWithInfo
            })
        }
        return res.status(404).json({
            message: 'No found', 
            status: 0,
            result: []
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({
            message:'Something went wrong',
            status: 0
        })
    })
}
exports.getAttendanceByStudentId = (req,res,next) => {
    return Attendance.find().then(result => {
        for(let i = 0; i < result.length; i++) {
            
        }
    })
}