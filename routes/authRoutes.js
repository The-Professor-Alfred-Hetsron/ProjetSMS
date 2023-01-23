import express from 'express'
import {
    createUser,
    loginUser,
    getUser,
    updatePassword,
    deleteUser,
    forgotPassword,
    resetPassword
} from '../controllers/authController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'
const router = express.Router()


//definition des routes
//creer un utilisateur
router.post('/auth/register', createUser)
//se connecter
router.post('/auth/login', loginUser)
//recuperer un utilisateur
router.get('/user/:id', isAuthenticatedUser, getUser)
//mot de passe oublie
router.post("/user/password/forgot", forgotPassword)
//reinitialiser le mot de passe
router.put("/user/password/reset/:token", resetPassword)
//modifier le mot de passe
router.put('/user/password/update', isAuthenticatedUser, updatePassword)
//supprimer un utilisateur
router.delete("/user/:id", isAuthenticatedUser, deleteUser)

export default router