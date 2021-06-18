const NotificationController = require('../controller/notification')
const express = require('express')
const router = express.Router()

router.get('/', NotificationController.getNotification)
router.post('/', NotificationController.postNotification)
router.post('/filter', NotificationController.getNotificationByTeacherId)
router.post('/filter-subId', NotificationController.getNotificationBySubjectId)
module.exports = router