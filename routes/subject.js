const express = require('express')

const route = express.Router()
const SubjectController = require('../controller/subject')

route.get('/', SubjectController.getSubjectById)
route.get('/teacher/:id', SubjectController.getSubjectByTeacherId)
route.post('/', SubjectController.postSubjectById)
route.post('/update', SubjectController.updateSubjectById)
route.post('/student', SubjectController.getSubjectOfStudent)

module.exports = route