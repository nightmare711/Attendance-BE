const User = require('../models/users')
const cloudinary = require('cloudinary').v2

exports.getUsers = (req,res,next) => {
    return User.find().then(result => res.status(200).json({
        message: "Get users successfully",
        users: result
    })).catch(err => console.log(err))
}
exports.getStudents = (req,res,next) => {
    return User.find().then(result => {
        const students = result.filter(user => !user.isTeacher)
        return res.status(200).json({
            message: 'Get students successfully',
            users: students
        })
    }).catch(err => res.status(500).json({
        message:'Something went wrong',
        error: err
    }))
}
exports.getTeacher = (req,res,next) => {
    return User.find().then(result => {
        const teacher = result.filter(user => user.isTeacher)
        return res.status(200).json({
            message: 'Get students successfully',
            users: teacher
        })
    }).catch(err => res.status(500).json({
        message:'Something went wrong',
        error: err
    }))
}
exports.postUser = (req,res,next) => {
    const name = req.body.name
    const isTeacher = req.body.isTeacher
    const email = req.body.email
    const password = req.body.password
    const dateOfBirth = req.body.dateOfBirth
    const createdAt = new Date()
    const phoneNumber = req.body.phoneNumber
    const base64 = req.body.base64
    return cloudinary.uploader.upload(base64, {
        overwrite: true,
        invalidate: true,
        width: 810, height: 456, crop: "fill"
    }, function (error, resUp) {
        if(!error) {
            const user = new User({
                name,
                isTeacher,
                email,
                password,
                dateOfBirth,
                createdAt,
                phoneNumber,
                imgUrl: resUp.secure_url
            })
            return user.save().then(result => res.status(201).json({
                message: 'Post created successfully',
                user: result
            })).catch(err => res.status(500).json({
                message: 'Something went wrong!',
                error: err
            }))
        } else {
            return res.status(501).json({
                message: 'Something went wrong',
                error: err
            })
        }
    });
}
exports.updateUser = async (req,res,next) => {
    const _id = req.params.id
    const name = req.body.name
    const isTeacher = req.body.isTeacher
    const email = req.body.email
    const password = req.body.password
    const dateOfBirth = req.body.dateOfBirth
    const createdAt = new Date()
    const phoneNumber = req.body.phoneNumber
    const base64 = req.body.base64
    const user = await User.findById(_id)
    user.name = name
    user.isTeacher = isTeacher
    user.email = email
    user.password = password
    user.dateOfBirth = dateOfBirth
    user.createdAt= createdAt
    user.phoneNumber= phoneNumber
    if(base64) {
        cloudinary.uploader.upload(base64, {
            overwrite: true,
            invalidate: true,
            width: 810, height: 456, crop: "fill"
        }, function (error, resUp) {
            if(!error) {
                user.imgUrl = resUp.secure_url
                return user.save().then(resultUpdate => res.status(201).json({
                    message: 'Update successfully',
                    user: resultUpdate
                })).catch(err => res.status(500).json({
                    message: 'Something went wrong',
                    error: err
                }))
            }
            return res.status(500).json({
                message: 'Can not upload image',
                error: []
            })
        })
    }
    return user.save().then(result => res.status(200).json({
        message: 'Update successfully',
        user: result
    }))
}
exports.deleteUser = (req,res,next) => {
    const _id = req.params.id
    return User.findById(_id).then(user => {
        if(user) {
            return User.deleteOne(user).then(deleteResult => res.status(200).json({
                message: 'Delete user successfully',
                user: deleteResult
            })).catch(err => res.status(500).json({
                message: 'Something went wrong',
                error: err
            }))
        }
        return res.status(404).json({
            message: 'The user could not be found',
            error: []
        })
    })
}
