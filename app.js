const express = require('express')
const UserRoute = require('./routes/users')
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')
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
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(UserRoute)

mongoose.connect('mongodb+srv://blockmagic:mGpoGQWeo2uDZD4q@cluster0.563wo.mongodb.net/users').then(() => app.listen(4000, () => console.log('app listen at port 4000'))).catch(err => console.log(err))
