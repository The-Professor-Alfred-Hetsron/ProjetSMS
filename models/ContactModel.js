import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true, "Please set the sender conctact"],
    },
    name:{
        type: String,
        required:[true, "Please enter the name of conctact"],
    },
    email:{
        type: String,
        required:[true, "Please enter of the conctact"],
    },
    phone:{
        type: String,
        required:[true, "Please number of the conctact"],
    },
    zipCode:{
        type:Number,
        default: Number.parseInt(237)
    },
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;