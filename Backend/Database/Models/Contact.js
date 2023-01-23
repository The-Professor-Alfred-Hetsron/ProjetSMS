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
    },
    messages: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }]
    }
}, {timestamps: true});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;