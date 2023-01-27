import express from 'express'
import {
    createContact,
    getContact,
    deleteContact,
    updateContact,
    getContacts
} from '../controllers/contactController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'
const router = express.Router()

//creer un contact
router.post('/new', isAuthenticatedUser, createContact)
//recuperer les contacts
router.get('/all', isAuthenticatedUser, getContacts)
//recuperer un contacct
router.get("/:id", isAuthenticatedUser, getContact)
//mettre a jour un utilisateur
router.put("/update/:id", isAuthenticatedUser, updateContact)
//supprimer un utilisateur
router.delete("/:id", isAuthenticatedUser, deleteContact)

export default router