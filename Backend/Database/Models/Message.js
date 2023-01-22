const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    }
}, {timestamps: true});

const User = mongoose.model('Contact', contactSchema);
module.exports = Contact;