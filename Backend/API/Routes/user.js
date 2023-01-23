const express = require('express')
const router = express.Router()

const UserController = require('.././Controllers/UserController')

router.post('/save', UserController.save)
router.post('/update', UserController.update)

module.exports = router