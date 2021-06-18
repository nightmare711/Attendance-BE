const express = require('express')
const AttendanceController = require('../controller/attendance')

const router = express.Router()

router.post('/add', AttendanceController.userAttendance)
router.get('/:subjectId', AttendanceController.getAttendanceBySubjectId)

module.exports = router