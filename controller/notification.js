const Notification = require('../models/notification')

exports.getNotification = (req,res,next) => {
    return Notification.find().then(result => res.status(200).json({
        message: 'success',
        status: 1,
        result: result
    })).catch(err => {
        console.log(err)
        return res.status(500).json({
            message: 'Something went wrong',
            status: 0
        })
    })
}
exports.postNotification = (req,res,next) => {
    const {
        title,
        content,
        teacherId,
        subjectId
    } = req.body 
    const newNoti = new Notification({
        title, 
        content, 
        teacherId,
        subjectId
    })
    return newNoti.save().then(result => res.status(201).json({
        message: 'successful',
        status: 1,
    })).catch(err => {
        console.log(err)
        return res.status(500).json({
            message: 'Something went wrong',
            status: 0
        })
    })
}