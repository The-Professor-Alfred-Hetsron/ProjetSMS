// Importation des biblioteques
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');

const {PORT, DBURL} = require('./Constants/index')

// Importation des routes
const ContactRoute = require('./Routes/contact');
const userRoutes = require('./Routes/user');

// Connexion a la BD
mongoose.set('strictQuery', true)

mongoose.connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.once('open', ()=>{
    console.log('Database Connection Established!')
})

db.on('error', (err)=>{
    console.log(err)
})


// Creation du serveur express
const app = express()

app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}...`)
})


// Utilisation des routes dans le serveur
app.use('/api/contact', ContactRoute)
app.use('/api/auth', userRoutes);