const express = require('express')
const router = express.Router()
const scheduleController = require('../Controller/lectureController')

router.post('/add', scheduleController.addSchedule)
router.get('/getSchedule/:id', scheduleController.getSchedule)
router.get('/getUserSchedule/:id', scheduleController.getUserSchedule)
router.post('/checkAvailability',scheduleController.checkAvailable)


module.exports = router