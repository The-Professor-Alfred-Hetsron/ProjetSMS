const express = require('express')
const router = express.Router()


const UserController = require('../Controllers/UserController');

// Same as singup and login
router.post('/login', UserController.login);


module.exports = router