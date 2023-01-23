import express from 'express'
import {
    createUser,
    loginUser,
    getUser,
    updatePassword,
    deleteUser,
    forgotPassword,
    resetPassword,
    getAllUsers,
    updateUser,
} from '../controllers/authController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'
const router = express.Router()


//definition des routes
//creer un utilisateur
router.post('/auth/register', createUser)
//se connecter
router.post('/auth/login', loginUser)
//mot de passe oublie
router.post("/password/forgot", forgotPassword)
//reinitialiser le mot de passe
router.put("/password/reset/:token", resetPassword)
//modifier le mot de passe
router.put('/password/update', isAuthenticatedUser, updatePassword)
//supprimer un utilisateur
router.delete("/user/:id", isAuthenticatedUser, deleteUser)
//recuperer un utilisateur
router.get('/:id', isAuthenticatedUser, getUser)
//obbtenir tous les utilisateurs
router.get("/all", isAuthenticatedUser, getAllUsers)
//mettre a jour un utilisateur
router.put("/update/user", isAuthenticatedUser, updateUser)

export default router