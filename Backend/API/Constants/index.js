const dotenv = require('dotenv')

// Configuration des variables d'environement1
dotenv.config({
    path : "../config/.env"
})

const PORT = process.env.PORT || 8080
const DBURL = process.env.DBURL || 'mongodb://localhost:27017/dbtest2'

module.exports = {
    PORT,
    DBURL
}