const express = require('express')
const UserRoute = require('./routes/users')
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')
const AuthController = require('./middleware/auth')
const AuthRoute = require('./routes/auth')
const SubjectRoute = require('./routes/subject')
const cors = require('cors')
const NotificationRoute = require('./routes/notification')
const AttendanceRoute = require('./routes/attendance')
var bodyParser = require('body-parser')

const app = express()


//middle ware
app.use(bodyParser.json({
    limit:'50mb'
}))
cloudinary.config({
    cloud_name: "mapimage",
    api_key: "677343416814958",
    api_secret: "iMckkluYXpg7YdukJbG6e-IVuco"
});
app.use(cors())
// app.use((req,res,next) => {
//     var origin = req.header('Referer')
//     if(origin !== 'http://localhost:3000/') {
//         res.status(404).json({
//             message: 'Request access rejected',
//         })
//         res.end()
//     } else {
//         res.setHeader('Access-Control-Allow-Origin', '*')
//         res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
//         res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//         next()
//     }
// })
app.use('/notification', NotificationRoute)
app.use(AuthRoute)
app.use('/attendance', AttendanceRoute)
// app.use(AuthController.isAuth)
app.use('/subject', SubjectRoute)
app.use(UserRoute)

mongoose.connect('mongodb+srv://blockmagic:mGpoGQWeo2uDZD4q@cluster0.563wo.mongodb.net/users').then(() => app.listen(process.env.PORT || 4200, () => console.log('app listen at port 4000'))).catch(err => console.log(err))
