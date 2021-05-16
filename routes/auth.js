const express = require('express')
const AuthController = require('../controller/auth')
const usersController  = require('../controller/users')

const router = express.Router();

router.post('/user/login', AuthController.userLogin)
router.post('/users', usersController.postUser)

module.exports = router;