import express from 'express'
import {
    sendWhatsappMessage,
    getMessage,
    deletetMessage,
    filterUserMessage   
} from '../controllers/messageController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'

const router = express.Router()

router.post('/new', isAuthenticatedUser, sendWhatsappMessage)
router.get('/:id', isAuthenticatedUser, getMessage)
router.get('/filter/:id', isAuthenticatedUser, filterUserMessage)
router.delete('/:id', isAuthenticatedUser, deletetMessage)

export default router