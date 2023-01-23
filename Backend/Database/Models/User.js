const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email:{
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    contacts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact"
        }]
    },
    messages: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }]
    }
    
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;