import mongoose from "mongoose";
import { CONNECTION_URL, DBNAME } from '../constants/index.js'

//console.log(CONNECTION_URL)

const connectdb = async () =>{
    await mongoose.connect(CONNECTION_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: DBNAME
    }).then((data) =>{
        console.log(`mongodb est connecté sur le server: ${data.connection.host}`);
    }).catch((error) => {
        console.log("connexion error: "+error.message)
    })
}
export default connectdb