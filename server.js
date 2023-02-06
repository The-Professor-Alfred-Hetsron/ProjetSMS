import { PORT, HOSTNAME } from './constants/index.js'
import app from './app.js';
import connectdb from './db/database.js'

//Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for Handling uncaught Exception`)
})

//handling unhandled promise rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);
    server.close(() =>{
        process.exit(1);
    });
});


//check db connection now
try {
    connectdb()
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//server listening loop
const server = app.listen(PORT, () => {
    console.log(`Lancement du serveur sur le port ${PORT}`)
    console.log(`Testez votre api a l'adresse http://${HOSTNAME}:${PORT}`)
})