const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content:{
        type: String
    },
    contacts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact"
        }]
    }
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;