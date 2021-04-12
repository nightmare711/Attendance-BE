const express = require('express')
const UserRoute = require('./routes/users')
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')
const AuthController = require('./middleware/auth')
const cors  = require('cors')
const AuthRoute = require('./routes/auth')
var bodyParser = require('body-parser')
const app = express()

const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
//middle ware
app.use(bodyParser.json({
    limit:'50mb'
}))
cloudinary.config({
    cloud_name: "mapimage",
    api_key: "677343416814958",
    api_secret: "iMckkluYXpg7YdukJbG6e-IVuco"
});

app.use(AuthRoute)
app.use(AuthController.isAuth)

app.use(UserRoute)

mongoose.connect('mongodb+srv://blockmagic:mGpoGQWeo2uDZD4q@cluster0.563wo.mongodb.net/users').then(() => app.listen(4000, () => console.log('app listen at port 4000'))).catch(err => console.log(err))
