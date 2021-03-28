const express = require('express')
const UserRoute = require('./routes/users')
var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(UserRoute)

app.listen(4000, () => console.log('app listen at port 4000'))