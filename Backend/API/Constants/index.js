const dotenv = require('dotenv')

// Configuration des variables d'environement1
dotenv.config({
    path : "./config/.env"
})

const PORT = process.env.PORT || 8080

module.exports = {
    PORT
}