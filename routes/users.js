const express = require('express')
const usersController = require('../controller/users')

const router = express.Router();

router.get('/users', usersController.getUsers)
router.get('/students', usersController.getStudents)
router.get('/teachers', usersController.getTeacher)
router.post('/users', usersController.postUser)
router.delete('/user/:id', usersController.deleteUser)
router.patch('/user/:id', usersController.updateUser)

module.exports = router;