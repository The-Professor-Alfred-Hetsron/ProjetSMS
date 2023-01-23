const express = require('express')
const router = express.Router()

const MessageController = require('.././Controllers/MessageController')

router.post('/save', MessageController.save)
router.get('/', MessageController.showAll)
router.post('/update', MessageController.update)
router.post('/delete', MessageController.destroy)


module.exports = router