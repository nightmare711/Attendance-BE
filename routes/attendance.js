const express = require('express')
const AttendanceController = require('../controller/attendance')

const router = express.Router()

router.post('/add', AttendanceController.userAttendance)

module.exports = router