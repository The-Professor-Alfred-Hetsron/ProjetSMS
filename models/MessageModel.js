import mongoose from 'mongoose'


const messageSchema = new mongoose.Schema({
    content:{
        type: String
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
        required:[true, "Please set the sender conctact"],
    },
    receivers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact",
            required: [true, "Please set the receivers conctacts"]
        }]
    },
    sendedAt:{
        type: Date,
        default:Date.now(),
    },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;