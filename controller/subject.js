const Subject = require('../models/subject')
const Users = require('../models/users')
const Attendance = require('../models/attendance')
const mongoose = require('mongoose')

exports.getSubjectByTeacherId = (req,res,next) => {
    const teacherId = req.params.id
    return Subject.find({teacherId: teacherId})
    .then(result => res.status(201).json({
        status: 1,
        message:'successful',
        result: result
    }))
    .catch(err => res.status(500).json({
        status:0,
        message: 'failed',
    }))
}
exports.getSubjectById = (req,res,next ) => {
    const id = req.body.id
    return Subject.findById(id)
    .then(result => res.status(201).json({
        status: 1,
        message:'successful',
        result: result
    }))
    .catch(err => res.status(500).json({
        status:0,
        message: 'failed',
    }))
}
exports.postSubjectById = (req,res,next) => {
    const {subjectName, startDate, endDate, studentsId, timeStart, timeEnd, timeAttendance, timeEndAttendance, teacherId} = req.body
    return Subject.findOne({subjectName: subjectName})
    .then(result => {
        if(!result)  {
            return Users.findById(teacherId).then(user =>{
                if(user.isTeacher) {
                    const subject = new Subject({
                        subjectName: subjectName, 
                        date: [startDate, endDate],
                        studentsId: studentsId,
                        time: [timeStart,timeEnd],
                        attendanceTime: [timeAttendance,timeEndAttendance],
                        teacherId: teacherId
                    })
                    return subject.save().then(result => {
                        var dt = new Date();
                        var month = dt.getMonth();
                        var year = dt.getFullYear();
                        let daysInMonth = new Date(year, month, 0).getDate();
                        const studentsAttendance = studentsId.map((student) => {
                            const temp = {
                                studentId: student
                            }
                            for(let i = 0; i <= daysInMonth; i++) {
                                temp[i.toString()] = false
                            }
                            return temp
                        })
                        const attendance = new Attendance({
                            teacherId: teacherId,
                            subjectId: result._id,
                            studentsAttendance: studentsAttendance,
                        })
                        return attendance.save().then(result => res.status(201).json({
                            status:1,
                            message: 'successful'
                        })).catch(err => console.log(err))
                        
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(500).json({
                            message:'Something went wrong',
                            status:0
                        })
                    })
                }
                return res.status(500).json({
                    message: "You can't add subject",
                    status:0
                })
            })
        }
        return res.status(500).json({
            message:'This subject added before',
            status:0
        })
    })
}
exports.updateSubjectById = (req,res,next) => {
    const { teacherId, subjectId, studentsId } = req.body
    const id = mongoose.Types.ObjectId(subjectId)
    return Subject.findOne({
        _id: id,
        teacherId: teacherId
    }).then((subject => {
        subject.studentsId = studentsId
        return subject.save().then(result => {
            Attendance.findOne({
                teacherId: teacherId,
                subjectId: subjectId
            }).then(result => {
                if(result && studentsId) {
                    var dt = new Date();
                    var month = dt.getMonth();
                    var year = dt.getFullYear();
                    let daysInMonth = new Date(year, month, 0).getDate();
                    const oldStudentsAttendance = []
                    const studentsIdInAttendance = []
                    for(let i = 0; i < result.studentsAttendance.length; i++ ) {
                        if(studentsId.includes(result.studentsAttendance[i].studentId)) {
                            console.log(studentsId, result.studentsAttendance[i].studentId)
                            oldStudentsAttendance.push(result.studentsAttendance[i])
                            studentsIdInAttendance.push(result.studentsAttendance[i].studentId)
                        }
                    }
                    const studentFilter = studentsId.filter(id => !studentsIdInAttendance.includes(id))
                    const studentsAttendance = studentFilter.map((student) => {
                        const temp = {
                            studentId: student
                        }
                        for(let i = 0; i <= daysInMonth; i++) {
                            temp[i.toString()] = false
                        }
                        return temp
                    })
                    var concatenateStudent = []
                    console.log(studentsAttendance)
                    if(studentsAttendance) {
                        concatenateStudent = oldStudentsAttendance.concat(studentsAttendance)
                    } else {
                        concatenateStudent = oldStudentsAttendance
                    }
                    result.studentsAttendance = concatenateStudent
                    
                    return result.save().then(resultSaveAttendance => res.status(201).json({
                        message:'success',
                        status: 1,
                    })).catch(err => {
                        return res.status(500).json({
                            message:'something went wrong',
                            status: 0
                        })
                    })
                }
                return res.status(500).json({
                    message:'No found attendance',
                    status: 0
                })
            })
        })
    }))
    .catch(err => {
        return res.status(500).json({
            message:'something went wrong',
            status: 0
        })
    })
}
exports.getSubjectOfStudent = (req,res,next) => {
    const studentId = req.body.studentId
    return Subject.find().then(async (result) => {
        const subjectOwn = []
        const users = await Users.find()
        if(result) {
            for(let i = 0; i < result.length; i++) {
                if(result[i].studentsId.includes(studentId)) {
                    const teacher = users.find(user => user._id.toString() === result[i].teacherId)
                    const Obj = {
                        _id: result[i]._id,
                        subjectName: result[i].subjectName, 
                        date: result[i].date,
                        studentsId: result[i].studentsId,
                        time: result[i].time,
                        attendanceTime: result[i].attendanceTime,
                        teacherId: result[i].teacherId,
                        teacherName: teacher.name,
                        teacherEmail: teacher.email,
                        phoneNumber: teacher.phoneNumber,
                        imgUrl: teacher.imgUrl,
                        idFB: teacher.idFB
                    }
                    subjectOwn.push(Obj)
                }
            } 
        }
        return res.status(200).json({
            message: 'successful',
            status:1,
            result: subjectOwn
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({
            message:'something went wrong',
            status: 0
        })
    })

}