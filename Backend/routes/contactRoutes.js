import express from 'express'
import {
    createContact,
    getContact,
    deleteContact,
    updateContact,
} from '../controllers/contactController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'
const router = express.Router()

//creer un utilisateur
router.post('/new', isAuthenticatedUser, createContact)
//recuperer un utilisateur
router.get("/:id", isAuthenticatedUser, getContact)
//mettre a jour un utilisateur
router.put("/update/:id", isAuthenticatedUser, updateContact)
//supprimer un utilisateur
router.delete("/:id", isAuthenticatedUser, deleteContact)

export default router