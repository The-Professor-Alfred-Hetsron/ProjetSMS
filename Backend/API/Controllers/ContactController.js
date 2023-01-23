// Import Model from the Database folder here
const Contact = require('../../Database/Models/Contact');

// Create a contact
const save = (req, res, next) =>{

    let contact = new Contact ({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    contact.save()
    .then(response =>{
        res.json({
            message: "Contact added successfully"
        })
    })
    .catch(error =>{
        res.json({
            message: "Error while saving contact"
        })
    })

}



// show all contact
const showAll = (req, res, next) =>{
    Contact.find()
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

// show one contact with a specific ID

const show = (req, res, next) =>{
    let contactID = req.body.contactID
    Contact.findById(contactID)
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


// update a contact
const update = (req, res, next) =>{
    let contactID = req.body.contactID

    let updatedData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }

    Contact.findByIdAndUpdate(contactID, {$set: updatedData})
    .then(response => {
        res.json({
            message: "Contact updated successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "Error updating contact"        })
    })
}



// delete a contact
const destroy = (req, res, next) =>{
    let contactID = req.body.contactID

    Contact.fondOneAndRemove(contactID)
    .then(response => {
        res.json({
            message: "Contact deleted successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "Error deleting contact"
        })
    })
}

module.exports = {
    save, showAll, show, update, destroy
}