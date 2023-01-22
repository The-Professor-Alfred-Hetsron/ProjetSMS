// Importation des biblioteques
const express = require('express')
const bodyParser = require('body-parser')
const {PORT} = require('./Constants/index')

// Importation des routes
const ContactRoute = require('./Routes/contact')


// Creation du serveur express
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}...`)
})


// Utilisation des routes dans le serveur
app.use('/api/contact', ContactRoute)