const express = require('express')
const AuthController = require('../controller/auth')

const router = express.Router();

router.post('/user/login', AuthController.userLogin)

module.exports = router;