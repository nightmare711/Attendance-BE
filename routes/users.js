const express = require('express')
const usersController = require('../controller/users')

const router = express.Router();

router.get('/users', usersController.getUsers)

module.exports = router;