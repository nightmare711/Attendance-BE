const Subject = require('../models/subject')
const Users = require('../models/users')
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
        console.log(result)
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
                    return subject.save().then(result => res.status(201).json({
                        status:1,
                        message: 'successful'
                    }))
                    .catch(err => res.status(500).json({
                        message:'Something went wrong',
                        status:0
                    }))
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
    console.log(req.body)
    const id = mongoose.Types.ObjectId(subjectId)
    return Subject.findOne({
        _id: id,
        teacherId: teacherId
    }).then((subject => {
        subject.studentsId = studentsId
        return subject.save().then(result => res.status(201).json({
            message:'success',
            status: 1,
        }))
    }))
    .catch(err => {
        return res.status(500).json({
            message:'something went wrong',
            status: 0
        })
    })
}