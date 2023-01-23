// Import Model from the Database folder here
const Message = require('../../Database/Models/Message');

// Create a message
const save = (req, res, next) =>{

    let message = new Message ({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })
    message.save()
    .then(response =>{
        res.json({
            message: "Message added successfully"
        })
    })
    .catch(error =>{
        res.json({
            message: "Error while saving message"
        })
    })

}



// show all message
const showAll = (req, res, next) =>{
    Message.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: "An error occurred!"
        })
    })
    
}

// show one message with a specific ID

const show = (req, res, next) =>{
    let messageID = req.body.messageID
    Message.findById(messageID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: "An error occurred!"
        })
    })
}


// update a message
const update = (req, res, next) =>{
    let messageID = req.body.messageID

    let updatedData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }

    Message.findByIdAndUpdate(messageID, {$set: updatedData})
    .then(response => {
        res.json({
            message: "Message updated successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "Error updating message"        })
    })
}



// delete a message
const destroy = (req, res, next) =>{
    let messageID = req.body.messageID

    Message.fondOneAndRemove(messageID)
    .then(response => {
        res.json({
            message: "Message deleted successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "Error deleting message"
        })
    })
}

module.exports = {
    save, showAll, show, update, destroy
}