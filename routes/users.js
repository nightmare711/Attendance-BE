const express = require('express')
const usersController = require('../controller/users')

const router = express.Router();

router.get('/users', usersController.getUsers)
router.get('/students', usersController.getStudents)
router.get('/teachers', usersController.getTeacher)
router.delete('/user/:id', usersController.deleteUser)
router.put('/user/:id', usersController.updateUser)
router.get('/user/:id', usersController.getUser)

module.exports = router;